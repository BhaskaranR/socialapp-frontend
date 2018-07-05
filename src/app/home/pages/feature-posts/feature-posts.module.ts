import { NgModule } from '@angular/core';
// import { PostsModule } from '../posts';
import { FeaturePostsComponent } from './feature-posts.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
 // import { PostDetailedPopupModule } from '../post-detailed/post-detail-popup.module';

const routes: Routes = [
  {
      path: '',
      component: FeaturePostsComponent
  }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  imports: [
    // PostsModule,
    // PostDetailedPopupModule,
    CommonModule,
    routing
  ],
  declarations: [
    FeaturePostsComponent,
  ],
  exports: [
    FeaturePostsComponent,
  ]
})
export class FeaturePostsModule { }
