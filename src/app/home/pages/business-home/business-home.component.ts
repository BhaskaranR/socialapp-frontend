import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatDialogRef, MatDialog, MatSidenav, MatIconRegistry } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { AddBusinessComponent } from '@app/home/pages/business-core/components/add_business/addbusiness';
import { User } from '@app/typings/types';


@Component({
	selector: 'app-settings-home',
	templateUrl: './business-home.html',
	styleUrls: ['./business-home.scss']
})

export class BusinessHomeComponent {

	public mediaChange;
	subscriptions: Subscription[] = [];

	activeTransitionAnimation: boolean;
	fireTransition: string;

	tabLinks = [
		{ label: 'Biz/Promos', link: '/business' },
		{ label: 'Recommended', link: 'recommended' },
		{ label: 'Member', link: 'member' },
		{ label: 'Yours', link: 'me' }
	];

	private user$: Observable<User>;
	currentMedia: string;
	meid: string;

	constructor(private _media: ObservableMedia,
		protected dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {

		// this.user$ = store.select(fromProfile.getMe);

		// this.subscriptions.push(this.store.select(fromProfile.getMeId).subscribe((id) => {
		// 	this.meid = id
		// }));
	}

	ngOnInit() {
		this.subscriptions.push(this._media.subscribe((change: MediaChange) => {
			this.currentMedia = change.mqAlias;
		}));
	}

	isOver(): boolean {
		return (this.currentMedia == "sm" || this.currentMedia == "xs")
	}

	animationDone($event: any) {
		// if ($event.fromState !== 'void') {
		// 	if ($event.toState === 'in') {
		// 		this.store.dispatch(new siteDataActions.SetTransitionAction(false));
		// 	}
		// 	else if ($event.toState === 'out') {
		// 		this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
		// 	}
		// }
	}

	dialogRef: MatDialogRef<AddBusinessComponent>;
	lastCloseResult: string;

	openAddBusiness() {
		this.dialogRef = this.dialog.open(AddBusinessComponent);
		this.dialogRef.afterClosed().subscribe(result => {
			this.lastCloseResult = result;
			this.dialogRef = null;
		});
	}

/*	openProfileLink() {
		this.router.navigate(['/profile', this.meid], { relativeTo: this.activatedRoute.root });
	}
*/
	ngOnDestroy() {
		this.subscriptions.map(subs => subs.unsubscribe());
	}
}
