import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatMenuModule, MatCardModule, MatIconModule, MatButtonModule, MatGridListModule, MatTooltipModule } from '@angular/material';
import { MentionModule } from '../../components/mention';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { MarkdownModule } from 'angular2-markdown';
import { MomentModule } from 'angular2-moment';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactionsModule } from '../../components/reactions/reactions-module';
import { AvatarModule } from 'ngx-avatar';
import { CommentsModule } from '@app/home/pages/comments';
import { GalleryModule } from  '@ngx-gallery/core';

export const galleryConfig: any  = {
  "animation": "fade",
  "loader": true,
  "description": {
    "position": "bottom",
    "overlay": true,
    "text": false,
    "counter": true
  },
  "bullets": {
    "position": "bottom"
  },
  "player": {
    "autoplay": false,
    "speed": 3000
  },
  "thumbnails": false,
  "navigation": true,
  "gestures": true
}

const components = [
  PostListComponent,
  PostItemComponent,
];

@NgModule({
  imports: [
    MatTooltipModule,
    CommonModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollDispatchModule,
    ReactionsModule,
    MarkdownModule.forRoot(),
    FlexLayoutModule,
    AvatarModule,
    CommentsModule,
    MentionModule,
    MomentModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    GalleryModule.forRoot(),
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    })
  ],
  declarations: components,
  exports: components
})
export class PostsModule { }
