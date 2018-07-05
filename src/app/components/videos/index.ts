import { VideoListComponent } from './video-list/video-list.component';
import { VideoListItemComponent } from './video-item/video-list.component';
import { VideoGridComponent } from './video-item/video-grid.component';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MatDialogModule, MatMenuModule, MatInputModule, MatRadioModule, MatRippleModule, MatProgressBarModule, MatIconModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdownModule } from 'angular2-markdown';

import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgCoreModule } from 'videogular2/core';

const components = [
  VideoGridComponent,
  VideoListComponent,
  VideoListItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRippleModule,
    MarkdownModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedModule,
    HttpModule,
    FlexLayoutModule,
    LazyLoadImageModule,
    RouterModule,
  ],
  declarations: components,
  exports: components,
  providers: [
  ],
  entryComponents: [
  ]})
export class VideosModule { }
