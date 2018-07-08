import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, NgZone, Inject } from '@angular/core';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/platform-browser';
import { Post } from '@app/typings/types';


@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.scss']
})
export class PhotoViewComponent {
  @Input() viewMode: string;
  @Input() posts: Post[];
  @Input() allPreviewsLoaded: boolean;
  @Input() adminState: Observable<{ adminMode: boolean, editMode: boolean }>;
  @Input() loading: boolean;
  @Input() expandedView: boolean = false;
  @Output() endOfListReachedEvent = new EventEmitter();
  @Output() activatePostPreviewEvent = new EventEmitter<Post>();
  @Output() itemClickedEvent = new EventEmitter<Post>();
  @ViewChild('postLoadStatus') postLoadStatus: ElementRef;

  private timer: Observable<number>;
  private scrollCheck: Subscription;

  defaultLazyimage = 'https://www.placecage.com/1000/1000';
  defaultAvatar = 'http://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_face,r_20,d_avatar.png/non_existing_id.png';
  last_week = moment().subtract(7, 'days').format('L')
  three_days_ago = moment().subtract(2, 'days').format('L')
  two_days_ago = moment().subtract(2, 'days').format('L')
  yesterday = moment().subtract(1, 'days').format('L');
  soon = (<any>moment()).add(50, 'mins')
  today = moment(new Date()).format('L');
  now = this.today
  constructor(private cd: ChangeDetectorRef, 
    private _ngZone: NgZone, @Inject(DOCUMENT) public document: any) {
  }

  postItemClick($event) {
    $event.preventDefault();
    this.itemClickedEvent.emit($event);
  }
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this.timer = Observable.timer(0, 500);
      this.scrollCheck = this.timer.subscribe(() => {
        var viewportTop = window.pageYOffset;
        var viewportBottom = window.innerHeight + viewportTop;
        if (!this.loading && this.postLoadStatus && this.postLoadStatus.nativeElement.offsetTop < viewportBottom && this.posts !== undefined && this.posts.length > 0 && !this.allPreviewsLoaded) {
          this._ngZone.run(() => {
            this.endOfListReachedEvent.emit(this.posts.length);
          });
        }
      });
    });
  }
}
