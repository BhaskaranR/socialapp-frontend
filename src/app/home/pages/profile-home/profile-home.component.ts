import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Component, OnInit, ViewChild, HostBinding, Input, OnDestroy, Inject, AfterViewInit, NgZone, NgModule } from '@angular/core';
import { MatSidenav, MatIconRegistry, MatDialog, MatDialogRef } from '@angular/material';
import { Apollo, QueryRef } from 'apollo-angular';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { style, animate, group, transition, trigger, query, stagger } from '@angular/animations';
import { NewPostComponent } from '@app/home/pages/new-post/newpost/newpost';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Post } from '@app/typings/types';
import { getUser } from '@app/graphql/queries/users/get-user.query';

@Component({
	selector: 'app-profile',
	templateUrl: './profile-home.component.html',
	styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit, AfterViewInit, OnDestroy {

	images: any[] = [];
	num = 1;

	private offset: number = 0;
	private limit: number = 5;
	dialogRef: MatDialogRef<NewPostComponent>;

	protected me$: any;
	private subscriptions: Subscription[] = [];
	protected meid: string;
	items: any;
	allPostsLoaded$: Observable<boolean>;
	user: any;
	peopleFollowing: any;
    business: any;
	currentMedia: string;
	followActionText;
	isMe: boolean;

	tabLinks = [
		{ label: 'About me', link: 'aboutme' },
		{ label: 'My Page', link: 'myPage' },
		{ label: 'My Shop', link: 'myshop' }
	];

	constructor(
		private _ngZone: NgZone,
		@Inject(DOCUMENT) private document: Document,
		protected router: Router,
		protected apollo: Apollo, 
		protected activatedRoute: ActivatedRoute,
		public _media: ObservableMedia,
		public sanitizer: DomSanitizer, 
		protected dialog: MatDialog) {
	}

	postRef: QueryRef<any>;
	postSub: Subscription;
	ngOnInit() {
		let profileId ;
		this.activatedRoute.params.subscribe((data) => {
			profileId = data.id;
		});
		this.apollo.query({
			query:getUser,
			variables:{
				id: profileId,
			  }
		}).subscribe((data:any) => {
			let me = data.data.user.id;

			if (me !== profileId) {
				this.isMe = false;
			}
			else {
				this.user = data.data.user;
				this.peopleFollowing = this.user.followingUsers.usersArray;
				this.business = this.user.mybusinesses;
				this.items = this.user.post.results;
				
				this.isMe = true
			}

		})

	}
	isOver(): boolean {
		return (this.currentMedia == "sm" || this.currentMedia == "xs")
	}

	ngAfterViewInit() {
		if (this.currentMedia == "xs" || this.currentMedia == "sm") return;
		this.subscriptions.push(Observable.timer(0).subscribe(() =>
			this._ngZone.onStable.first().subscribe(() =>
				this.document.body.scrollTop = 500)));

	}

	searchMore(postsLength: number) {
		// this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
	}

	ngOnDestroy() {
		// this.store.dispatch(new postActions.ClearPostStoreAction());
		// this.subscriptions.forEach(subsc => subsc.unsubscribe());
	}


	gotoDetail(id: string) {
		this.router.navigate(['/detail', id], { relativeTo: this.activatedRoute.root });
	}
	navigateToPost(post: Post) {
		this.router.navigate(['/posts', post._id]);
		//this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
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

}