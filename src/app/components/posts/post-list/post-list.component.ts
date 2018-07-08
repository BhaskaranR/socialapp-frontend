import {
	Component, Input, Output, ViewChild, ElementRef, SimpleChanges, NgZone,
	EventEmitter,  ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { animations } from '../post.animations';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Post, User } from '@app/typings/types';


@Component({
	selector: 'app-post-list',
	templateUrl: 'post-list.component.html',
	styleUrls: ['post-list.component.scss'],
	animations: animations,
})

export class PostListComponent {

	@Input() posts: Post[] = [];
	@Input() me: User;
	@Input() allPreviewsLoaded: boolean;
	@Input() adminState: Observable<{ adminMode: boolean, editMode: boolean }>;
	@Input() loading: boolean;
	@Input() expandedView: boolean = false;
	@Output() endOfListReachedEvent = new EventEmitter();
	@Output() activatePostPreviewEvent = new EventEmitter<Post>();
	@Output() openPostInDialog = new EventEmitter<Post>();

	@ViewChild('postLoadStatus') postLoadStatus: ElementRef;

	private timer: Observable<number>;
	private _scrollSubscription: Subscription | null = null;
	fireTransition: string;
	prepareAnimation: boolean = false;
	private activeTransitionAnimation: boolean;
	private animSub: Subscription;
	@Input() viewMode: string;
	_scrollables: CdkScrollable[];


	constructor(private cd: ChangeDetectorRef,
		private _scrollDispatcher: ScrollDispatcher,
		@Inject(DOCUMENT) public document: any) {
		// this.animSub = store.select(appSelectors.getAnimationData).subscribe(data => {
		// 	this.activeTransitionAnimation = data.pageTransitionActive;
		// });
	}

	ngOnInit() {
		console.log(this.posts);

	}

	scrollMore() {
		console.log("scrolled");
	}

	ngAfterViewInit() {
		this._scrollables = this._scrollDispatcher.getAncestorScrollContainers(this.postLoadStatus);
		this._scrollSubscription  = this._scrollDispatcher.scrolled(500).subscribe(() => {
			//todo for now take the 0th scrollable
			const s = this._scrollables[0]
			const viewportBottom = window.innerHeight + s.getElementRef().nativeElement.scrollTop - s.getElementRef().nativeElement.getBoundingClientRect().top;
			if (!this.loading && this.postLoadStatus && this.postLoadStatus.nativeElement.offsetTop < viewportBottom && this.posts !== undefined && this.posts.length > 0 && !this.allPreviewsLoaded) {
				this.endOfListReachedEvent.emit(this.posts.length);
			}
		})
		
		/*this._ngZone.runOutsideAngular(() => {
			this.timer = Observable.timer(0, 500);
			this.scrollCheck = this.timer.subscribe(() => {
				var viewportTop = window.pageYOffset;
				var viewportBottom = window.innerHeight + viewportTop;
				if (!this.loading && this.postLoadStatus && this.postLoadStatus.nativeElement.offsetTop < viewportBottom && this.posts !== undefined && this.posts.length > 0 && !this.allPreviewsLoaded ) {
					this._ngZone.run(() => {
						this.endOfListReachedEvent.emit(this.posts.length);
					});
				}
			});
		}); */

	}



	private isElementClippedByScrolling(element: ClientRect, scrollContainers: ClientRect[]) {
		return scrollContainers.some(scrollContainerRect => {
			const clippedAbove = element.top < scrollContainerRect.top;
			const clippedBelow = element.bottom > scrollContainerRect.bottom;
			const clippedLeft = element.left < scrollContainerRect.left;
			const clippedRight = element.right > scrollContainerRect.right;

			return clippedAbove || clippedBelow || clippedLeft || clippedRight;
		});
	}

	/*private _createOverlay(): OverlayRef {
		const origin = this._getOrigin();
		const position = this._getOverlayPosition();

		// Create connected position strategy that listens for scroll events to reposition.
		// After position changes occur and the overlay is clipped by a parent scrollable then
		// close the tooltip.
		const strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
		strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
		strategy.onPositionChange.subscribe(change => {
			if (change.scrollableViewProperties.isOverlayClipped &&
				this._tooltipInstance && this._tooltipInstance.isVisible()) {
				this.hide(0);
			}
		});
	}*/

	getPostId(index, item) {
		return item._id;
	}

	handleOpenPostInDialog(selectedPost: Post) {
		this.openPostInDialog.emit(selectedPost);
	}

	handleItemClick(selectedPost: Post) {
		this.activatePostPreviewEvent.emit(selectedPost);

		/*this.cd.detach();

		//for this component
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		//for child component
		this.store.dispatch(new siteDataActions.AddBlockingAnimationAction(null));

		this.fireTransition = 'out';
		this.cd.detectChanges();
		this.activatePostPreviewEvent.emit(selectedPost);
		*/
	}

	handleTransitionDone($event: any) {
		// if ($event.fromState !== 'void') {
		// 	if ($event.toState === 'out') {
		// 		this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
		// 	}
		// }
	}

	handleItemAnimationDone($event: any /*AnimationEvent*/) {
		// if ($event.fromState !== 'void') {
		// 	this.store.dispatch(new siteDataActions.RemoveBlockingAnimationAction(null));
		// }
	}

	ngOnDestroy() {
		this.animSub.unsubscribe();
		this._scrollSubscription.unsubscribe();
	}
}