import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatMenuModule, MatListModule, MatInputModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { NewPostComponent } from './newpost/newpost';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { AvatarModule } from 'ngx-avatar';
import { MarkdownModule } from 'angular2-markdown';
import { UserGroupListComponent } from './usergroup/usergroup-list.component';
import { CheckinComponent } from './checkin/checkin.component';
import { NewPromoPostComponent } from './newpromopost/newpromopost.component';

import { MentionModule } from '@app/components/mention';
import { environment } from '@env/environment';
import { PhotosModule } from '@app/components/photos';

const components = [
  NewPostComponent,
  NewPromoPostComponent,
  CheckinComponent,
  UserGroupListComponent
];

@NgModule({
  imports: [
    CommonModule,
    PhotosModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MarkdownModule.forRoot(),
    HttpModule,
    FileUploadModule,
    FlexLayoutModule,
    MatListModule,
    AvatarModule,
    MentionModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    }),
  ],
  declarations: components,
  exports: components,
  entryComponents: [
    NewPostComponent,
    NewPromoPostComponent,
    CheckinComponent,
    UserGroupListComponent]
})
export class NewPostModule { }
