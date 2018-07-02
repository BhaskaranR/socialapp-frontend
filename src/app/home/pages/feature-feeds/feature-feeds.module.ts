import { NgModule } from '@angular/core';
// import { PostsModule } from '../posts';
import { FeatureFeedsComponent } from './feature-feeds.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
 // import { PostDetailedPopupModule } from '../post-detailed/post-detail-popup.module';

const routes: Routes = [
  {
      path: '',
      component: FeatureFeedsComponent
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
    FeatureFeedsComponent,
  ],
  exports: [
    FeatureFeedsComponent,
  ]
})
export class FeatureFeedsModule { }
