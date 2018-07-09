import { MomentModule } from 'angular2-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatButtonModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoPostsComponent } from './photo-posts.component';
import { Routes, RouterModule } from '@angular/router';
import { PostsModule } from '@app/components/posts';
import { GalleryModule } from '@ngx-gallery/core';
import { PhotosModule } from '@app/components/photos';


const routes: Routes = [
  {
      path: '',
      component: PhotoPostsComponent
  }
];

export const routing = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    PhotosModule,
    FlexLayoutModule,
    PostsModule,
    LazyLoadImageModule,
    GalleryModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MomentModule,
    routing
  ],
  declarations: [
    PhotoPostsComponent,
    PhotoViewComponent
  ],
  exports: [
    PhotoPostsComponent,
    PhotoViewComponent
  ]
})
export class PhotoPostsModule { }
