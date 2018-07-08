import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, NgZone, Inject, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';
import { DOCUMENT } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material';
import { User, Post } from '@app/typings/types';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css']
})
export class PostDetailedComponent implements OnInit, OnDestroy {
  prev: any;
  data: any;
  items$: any;
  postId: any;
  private offset: number = 0;
  private limit: number = 5;
  currentMedia: string;
  protected me$: Observable<User>;
  private subscriptions: Subscription[] = [];
  protected meid: string;
  photos$: Observable<Post>;
  loading$: Observable<boolean>;
  currentAlias: string;

  constructor(
    private _media: ObservableMedia,
    private _ngZone: NgZone,
    protected activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private location: Location,
  ) {

    // this.subscriptions.push(store.select(fromApp.getPrevRoute).subscribe(prev => {
    //   this.prev = prev;
    // }));
  }
  goback() {
    this.location.back();
  }
  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      params => {
        this.postId = params['id'];
        // this.store.dispatch(new postActions.SelectPostAction(this.postId));
        // this.postservice.getPostbyId(this.postId)
        //   .subscribe(post => {
        //     this.data = post
        //   }
        //   )
      }
    ));
    // this.me$ = this.store.select(fromProfile.getMe);
    // this.items$ = this.store.select(fromPosts.getSelectedPostWithAllImages);
    // this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
    //   this.currentAlias = change.mqAlias;
    // }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  isOver(): boolean {
    return (this.currentAlias == "sm" || this.currentAlias == "xs")
  }
}
