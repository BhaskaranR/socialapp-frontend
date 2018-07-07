import {
  Component, Input, ChangeDetectionStrategy, Output, EventEmitter, NgZone,
  AfterViewInit
} from '@angular/core';

import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry } from '@angular/material';
import { Inject, OnDestroy, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { animations } from '../post.animations';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import * as moment from 'moment';
import { ReactionsChangeEvent, ReactionsPosition } from '../../../components/reactions';
import { reactions } from '../../../components/reactions/reactions.model';
import { Post, Geotag, User, LikeByPost } from '@app/typings/types';
import { AnimationEvent  } from '@angular/animations';

@Component({
  selector: 'post-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  host: {
    '[@itemSelected]': 'fireAnimation',
    '(@itemSelected.done)': "animationDone($event)",
    '[@fadeOut]': 'fade',
    '(@fadeOut.done)': 'fadeDone($event)',
    '[class.change-opacity-transform]': 'prepareAnimation'
  },
  animations: animations
})
export class PostItemComponent implements OnInit, OnDestroy {

  private _item: Post;
  last_week = moment().subtract(7, 'days').format('L')
  three_days_ago = moment().subtract(2, 'days').format('L')
  two_days_ago = moment().subtract(2, 'days').format('L')
  yesterday = moment().subtract(1, 'days').format('L');
  soon = (<any>moment()).add(50, 'mins')
  today = moment(new Date()).format('L');
  now = this.today

  favoredBy: LikeByPost[] = []

  uniqueLikesWithCount: { key: string, value: number }[] = [];

  showDelay = 1000;
  hideDelay = 1000;
  showExtraClass = true;
  position: ReactionsPosition = 'above';
  get item() {
    return this._item;
  }
  get images() {
    if (this.item.photos && this.item.photos.length > 0) {
      const photos = this.item.photos;
      return photos.map(photo => ({
        src: photo.large,
        thumbnail: photo.large,
      }));
    }
  }

  @Input() expandedView: boolean = false;

  @Input() viewMode: string;

  onReactionsChange(event: ReactionsChangeEvent) {
    this._myLikeKey = event.value;
    //this.store.dispatch(new postActions.FavorAction({ postId: this.item._id, favor: event.value }));
  }

  @Input('item')
  set item(val: Post) {
    this._item = val;
    if (val != null) {
      this.favoredBy = val.likes;
      this.uniqueLikesWithCount = this.getUniqueLikesWithCount();
    }
  }
  @Output() itemClickedEvent = new EventEmitter<Post>();
  @Output() itemAnimationDoneEvent = new EventEmitter();
  @Output() openPostInDialog = new EventEmitter<Post>();
  comments: Comment[] = [];
  shares: string[] = [];


  /* get getUniqueLikes(): { key: string, value: number }[]
   {
     const uniqueLikes =  Array.from(new Set( this.favoredBy.map(f => f.like)))
         uniqueLikes.reduce( uniquelikewithcount: [{ like : string, count : number }], )
   }*/

  fireAnimation: boolean;
  prepareAnimation: boolean;
  safeText: SafeHtml;
  timerSub: Subscription;
  timerSub2: Subscription;
  fade: string;
  avatars = new Array(16).fill(0).map((_, i) => `svg-${i + 1}`);
  selectedAvatar = this.avatars[2];
  // newcommentSubscription: Subscription
  newfavorSubscription: Subscription;

  showComments: boolean = false;
  commentsEnabled: boolean = true;

  private meIdSubscription: Subscription;
  me$: Observable<User>;
  meid: string;


  open: boolean = false;
  spin: boolean = true;
  direction: string = 'right';
  animationMode: string = 'fling';
  showOptions: boolean = false;

  private _fixed: boolean = false;

  zoom = 18;

  styles: any = [{
    featureType: 'all',
    stylers: [{
      saturation: -80
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      hue: '#00ffee'
    }, {
      saturation: 50
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];


  get fixed() { return this._fixed; }
  set fixed(fixed: boolean) {
    this._fixed = fixed;
    if (this._fixed) {
      this.open = true;
    }
  }

  reactions = reactions;
  _myLikeKey: string;
  get myLike() {
    if (this._myLikeKey) {
      return this.reactions.filter(rect => rect.key == this._myLikeKey)[0]
    }
  }

  isLiked: boolean = false;
  touch: boolean;


  @ViewChild('map1') map1;
  constructor(
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private ds: DomSanitizer,
    private _ngZone: NgZone,
    private media: ObservableMedia) {

     /*this.newcommentSubscription = this.store.select(getMyNewPostComment).subscribe(comment => {
      if (comment == null || comment._id !== undefined || comment.postId !== this.item._id) return;
      if (comment._id && this.comments)
        this.comments = [...this.comments, comment];
      else if (comment._id)
        this.comments = [comment];
    });
    */
    

    // this.newfavorSubscription = this.store.select(getMyNewFavored).subscribe(favored => {
    //   if (favored == null || favored.postId || favored.postId !== this.item._id) return;
    //   if (favored && favored.postId == this.item._id && this.favoredBy)
    //     this.favoredBy = [...this.favoredBy, { userId: favored.userId, like: favored.favor }];
    //   else if (!favored)
    //     this.favoredBy = [{ userId: favored.userId, like: favored.favor }];

    //   this.uniqueLikesWithCount = this.getUniqueLikesWithCount();
    // });
  }


  currentLoc = {
    long: 0,
    lat: 0,
    maxDistance: 1,
    limit: 0
  }

  ngOnInit() {
    if (this.geotag) {
      this.currentLoc.lat = this.geotag.coordinates.lat;
      this.currentLoc.long = this.geotag.coordinates.long;
    }
    this.media.subscribe(media => {
      this.touch = (media.mqAlias == "xs" || media.mqAlias == "sm");
      if (this.map1) {
        this.map1.triggerResize().then(() => this.map1._mapsWrapper.setCenter({
          lat: this.currentLoc.lat,
          lng: this.currentLoc.long
        }));
      }
    });
    // this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
    //   this.meid = id;
    //   let myFav = this.favoredBy.find(favored => favored.userId == this.meid)
    //   this.isLiked = myFav ? true : false;
    //   this._myLikeKey = myFav ? myFav.like : "like";
    // });
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.showOptions = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showOptions = false;
  }


  getUniqueLikesWithCount(): { key: string, value: number }[] {
    const uniqueLikes = Array.from(new Set(this.favoredBy.map(f => f.like)))
    return uniqueLikes.reduce((uniqueLikesWithCount: [{ key: string, value: number }], like: string) => {
      return [...uniqueLikesWithCount, { key: like, value: this.favoredBy.filter((f) => f.like == like).length }]
    }, [])
  }


  getProfile() {
    // this.router.navigate(['/profile', this.item.userId]);
  }

  get user() {
    return {}
    // return {
    //   _id: this.item.userId,
    //   firstName: this.item.userFirstName,
    //   lastName: this.item.userLastName,
    //   images: {
    //     small: this.item.userImgSmall,
    //     normal: this.item.userImgNormal
    //   }
    // };
  }

  get name(): string {
    return `${this.item.user.username}`;
  }
  get time(): string {
    return this.item.modified_date;
  }
  get thumbnailImage(): string {
    return `${this.item.user.profile.avatarId}`;
  }

  get geotag(): Geotag {
    return this.item.geotag;
  }

  get showGeomap() {
    return (!(this.item.photos && this.item.photos.length > 0) && this.geotag);
  }

  /*
  toggleLike(input: { isSelected: boolean; like: string }) {
    this.isLiked = input.isSelected;
    if (!input.isSelected) {
      this.myLike = input.like;
      this.store.dispatch(new postActions.UnFavorAction({ postId: this.item._id, favor: input.like }));
    }
    else {
      this.myLike = "like";
      this.store.dispatch(new postActions.FavorAction({ postId: this.item._id, favor: input.like }));
    }
  }
  */

  openPost($event: Event) {
    $event.preventDefault();
    this.openPostInDialog.emit(this.item);
  }

  postItemClick($event: Event) {
    $event.preventDefault();
    this.itemClickedEvent.emit(this.item);
    /*  this.prepareAnimation = true;
      this.timerSub = Observable.timer(50).subscribe(() => {
          this.fireAnimation = true;
          this.timerSub.unsubscribe();
          this.itemClickedEvent.emit(this.item);
      });
      */
  }

  animationDone($event: AnimationEvent ) {
    if ($event.fromState !== 'void') {
      this.prepareAnimation = false;
      this.itemAnimationDoneEvent.emit($event);
    }
  }

  fadeDone($event: AnimationEvent) {
    if ($event.fromState !== 'void') {
      this.prepareAnimation = false;
    }
  }
  mentionUsers(text: string) {
    const pattern = /@.([^\s]+).([^\s]+)/gi;
    var user = text.match(pattern)
    if (user) {
      return user[0].substr(1);
    }
    return;
  }
  ngOnDestroy() {
    this.meIdSubscription.unsubscribe();
    //this.newcommentSubscription.unsubscribe();
    this.newfavorSubscription.unsubscribe();
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    if (this.timerSub2) {
      this.timerSub2.unsubscribe();
    }
  }
}
