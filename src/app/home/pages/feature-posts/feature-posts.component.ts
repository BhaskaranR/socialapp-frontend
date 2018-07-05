import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-feature-posts',
  templateUrl: './feature-posts.component.html',
  styleUrls: ['./feature-posts.component.scss']
})
export class FeaturePostsComponent {
  // num = 1;
  // items$: Observable<Post[]>;
  // loading$: Observable<boolean>;
  // allPostsLoaded$: Observable<boolean>;
  // private subscriptions: Subscription[] = [];
  // private offset: number = 0;
  // private limit: number = 10;
  // protected meid: string;
  // private postDialogRef: MatDialogRef<PostDetailPopupComponent>;
  
  // constructor(protected store: Store<fromRoot.AppState>,
  //   public dialog: MatDialog,
  //   private router: Router) {
  // }

  // ngOnInit() {
  //   this.items$ = this.store.select(fromPosts.getAllPosts);
  //   this.loading$ = this.store.select(fromPosts.getPostsLoading);
  //   this.allPostsLoaded$ = this.store.select(fromPosts.getAllPostPreviewsLoadedStatus);

  //   this.subscriptions.push(this.store.select(getMeId).subscribe((id) => {
  //     this.meid = id;
  //     this.store.dispatch(new postActions.LoadPostPreviewsAction({
  //       feedtype: 'Home',
  //       userid: this.meid,
  //       offset: this.offset,
  //       limit: this.limit
  //     }));
  //   }));
  // }

  // searchMore(postsLength: number) {
  //   this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
  // }

  // navigateToPostDialog(post: Post) {
  //   this.store.dispatch(new postActions.SelectPostAction(post._id));
  //   this.postDialogRef = this.dialog.open(PostDetailPopupComponent, {
  //     panelClass: 'full-screen'
  //   });
  //   this.postDialogRef.afterClosed()
  //     .subscribe(result => {
  //       this.postDialogRef = null;
  //     });

  //   event.preventDefault();
  //   this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
  // }

  // navigateToPost(post: Post) {
  //   this.router.navigate(['/posts', post._id]);
  //   this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
  // }

  // ngOnDestroy() {
  //   this.store.dispatch(new postActions.ClearPostStoreAction());
  // }

}

