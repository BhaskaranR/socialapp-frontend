import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './newcomment/newcomment.component';
import { CommentListComponent } from './comment-list/comments-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatCardModule, MatListModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmojipickerModule } from '@app/components/emojipicker';
import { AvatarModule } from 'ngx-avatar';

const components = [
    NewCommentComponent,
    CommentListComponent,
    CommentItemComponent, 
  ];

@NgModule({
  imports: [
    CommonModule,
    EmojipickerModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    AvatarModule,
    FlexLayoutModule
  ],
  declarations: components,
  exports: components
})
export class CommentsModule {}
