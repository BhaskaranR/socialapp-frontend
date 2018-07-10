import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatButtonModule, MatIconModule } from '@angular/material';
import { PostDetailPopupComponent } from './post-detail-popup.component';
import { PostsModule } from '@app/components/posts';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    PostsModule
  ],
  declarations: [ PostDetailPopupComponent],
  exports : [PostDetailPopupComponent],
  entryComponents: [PostDetailPopupComponent]
})
export class PostDetailedPopupModule { }
