import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '@app/typings/types';

@Component({
  selector: 'app-photo-posts',
  templateUrl: './photo-posts.component.html',
  styleUrls: ['./photo-posts.component.css']
})
export class PhotoPostsComponent implements OnInit {
  images: any[] = [];
  num = 1;
  items$: Observable<Post[]>;
  loading$: Observable<boolean>;
  allPostsLoaded$: Observable<boolean>;
  private offset: number = 0;
  private limit: number = 30;
  protected meid: string;
  isGalleryView = true;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    for (this.num; this.num <= 9; this.num += 1) {
      this.images.push(this.num);
    }
  }

  ngOnInit() {
    const value = this.activatedRoute.data["value"].page;
    // this.items$ = this.store.select(fromPosts.getAllPosts);
    // this.loading$ = this.store.select(fromPosts.getPostsLoading);
    // this.allPostsLoaded$ = this.store.select(fromPosts.getAllPostPreviewsLoadedStatus);
    // this.subscriptions.push(this.store.select(getMeId).subscribe((id) => {
    //   this.meid = id;
    //   this.store.dispatch(new postActions.LoadPostPreviewsAction({
    //     feedtype: value,
    //     userid: this.meid,
    //     offset: this.offset,
    //     limit: this.limit
    //   }));
    // }));
  }

  selectedIndex = 1;
  showDiv(index) {
    this.selectedIndex = index;
  }

  searchMore(postsLength: number) {
   // this.store.dispatch(new postActions.LoadMorePostPreviewsAction(postsLength))
  }

  navigateToPost(post: Post) {
    this.router.navigate(['/posts', post._id]);
   // this.store.dispatch(new appActions.PrevRouteAction(this.router.url));
  }

  ngOnDestroy() {
   // this.store.dispatch(new postActions.ClearPostStoreAction());
  }

}
