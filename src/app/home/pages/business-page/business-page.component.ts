import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Component, OnInit, ViewChild, HostBinding, Input, OnDestroy, Inject, AfterViewInit, NgZone, NgModule } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialog, MatDialogRef } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';
import { Post, Business, User } from '@app/typings/types';
import { NewPostComponent } from '@app/home/pages/new-post/newpost/newpost';

@Component({
	selector: 'app-businesspage',
	templateUrl: './business-page.component.html',
	styleUrls: ['./business-page.component.scss']
})
export class BusinessPageComponent implements OnInit, OnDestroy {

	lat = -34.397;
  lng = 150.644;
  latA = -34.754764;
  lngA = 149.736246;
  zoom = 11;


	private offset: number = 0;
	private limit: number = 5;

	items$: Observable<Post[]>;
	loading$: Observable<boolean>;

	allPostsLoaded$: Observable<boolean>;
	business$: Observable<Business>;
	peopleFollowing$: Observable<User[]>;

	currentMedia: string;
	followActionText;
	isMe: boolean;
	private subscriptions: Subscription[] = [];

	dialogRef: MatDialogRef<NewPostComponent>;
	tabLinks = [
		{ label: 'About', link: 'aboutme' },
		{ label: 'Shop', link: 'myshop' }
	];

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


	constructor(
		private _ngZone: NgZone,
		@Inject(DOCUMENT) private document: Document,
		protected router: Router,
		protected apollo: Apollo, 
		protected activatedRoute: ActivatedRoute,
		public _media: ObservableMedia,
		sanitizer: DomSanitizer, protected dialog: MatDialog) {
		// this.items$ = this.store.select(fromPosts.getAllPosts);
		// this.loading$ = this.store.select(fromPosts.getPostsLoading);
		// this.allPostsLoaded$ = this.store.select(fromPosts.getAllPostPreviewsLoadedStatus);
	}

	ngOnInit() {
		// this.subscriptions.push(this.store.select(fromBusiness.getSelectedBizIsMine).subscribe((isme) => this.isMe =isme));
		// this.peopleFollowing$ = this.store.select(fromBusiness.getSelectedBizFollowing);
		// this.business$ = this.store.select(fromBusiness.getSelectedBiz);
		
		// this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
		// 	this.currentMedia = change.mqAlias;
		// }));
		// this.subscriptions.push(Observable.combineLatest(
		// 	this.activatedRoute.params,
		// ).subscribe(([params, userMyFollowing]) => {
		// 		this.store.dispatch(new bizActions.GetAndSelectBusinessAction(params["id"]));
		// 	}));
	}

	isOver(): boolean {
		return (this.currentMedia == "sm" || this.currentMedia == "xs")
	}


	searchMore(postsLength: number) {
	//	this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
	}

	ngOnDestroy() {
		// this.subscriptions.map(subs => subs.unsubscribe());
		// this.store.dispatch(new postActions.ClearPostStoreAction());
	}

	openNewPostDialog() {
		this.dialogRef = this.dialog.open(NewPostComponent, {
			disableClose: false,
			panelClass: 'custom-overlay-pane-class',
			hasBackdrop: true
		});
		this.dialogRef.afterClosed().subscribe(result => {
			this.dialogRef = null;
		});
	}


	gotoDetail(id: string) {
		this.router.navigate(['/detailbiz', id]);
	}
}
