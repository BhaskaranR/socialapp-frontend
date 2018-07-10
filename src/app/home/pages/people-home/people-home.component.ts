import { Component, ViewChild, HostBinding, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialogRef, MatDialog, MatTabChangeEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { User } from '@app/typings/types';

@Component({
  templateUrl: './people-home.component.html',
  styleUrls: ['./people-home.component.scss']
})

export class PeopleComponent implements OnInit, OnDestroy {
  private _subscription;

  subscriptions: Subscription[] = [];

  activeTransitionAnimation: boolean;
  fireTransition: string;

  private user$: Observable<User>;
  private meIdSubscription: Subscription;
  meid: string;
  isOpen: boolean;
  getIfUserSuccess: Subscription;

  _activeLinkIndex = 2;


  get activeLinkIndex() {
    return this._activeLinkIndex;
  }
  set activeLinkIndex(val: number) {
    this._activeLinkIndex = val;
    this.getData();
  }


  // people$: Observable<UserAction[]>;
  currentMedia: string;
  tabLinks = [
    { label: 'Suggestions', link: 'suggestions' },
    { label: 'Followers', link: 'followers' },
    { label: 'Following', link: 'following' }
  ];

  constructor(private _media: ObservableMedia,
    private router: Router, private activatedRoute: ActivatedRoute) {

   // store.select(fromApp.getSideNavState).subscribe(isSideNavOpen => {
     // this.isOpen = isSideNavOpen;
    //});
    //this.user$ = store.select(fromProfile.getMe);
    //this.meIdSubscription = this.store.select(fromProfile.getMeId).subscribe((id) => {
     // this.meid = id
    //});
  }

  isOver(): boolean {
    return (this.currentMedia == "sm" || this.currentMedia == "xs")
  }

  ngOnInit() {
    this._media.subscribe((change: MediaChange) => {
      this.currentMedia = change.mqAlias;
    });
    this.getData();
  }

  //TODO change this in the selector
  private getData() {
    // if (this.activeLinkIndex === 0) {
    //   this.store.dispatch(new userActions.GetAllUsersAction());
    //   this.people$ = this.store.select(userSelector.getSuggestedUsers);
    // } else if (this.activeLinkIndex === 1) {
    //   this.store.dispatch(new profileActions.GetMyFollowersAction());
    //   this.people$ = this.store.select(userSelector.getMyFollowersWithAction);
    // } else if (this.activeLinkIndex === 2) {
    //   this.store.dispatch(new profileActions.GetMyFollowingAction());
    //   this.people$ = this.store.select(userSelector.getMyFollowingWithAction);
    // }
  }

  openProfileLink() {
    this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
  }

  tabChanged(indx: number) {
    this.activeLinkIndex = indx;
    this.getData();
  }

  peopleFollowAction($event: { id: string, action: string }) {
    // if ($event.action === 'Follow') {
    //   this.store.dispatch(new userActions.FollowUserAction($event.id));
    // } else {
    //   this.store.dispatch(new userActions.UnFollowUserAction($event.id));
    // }
  }

  ngOnDestroy() {
    //this.meIdSubscription.unsubscribe();
  }
}
