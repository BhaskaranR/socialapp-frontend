import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { MenuItems } from '@app/shared/menu-items/menu-items';
import { ComponentPageTitle } from '@app/shared/page-title/page-title';
import { RouterModule } from '@angular/router';
import { SideBarContainerModule } from '../../../shared/side-bar-container/side-bar-container.module';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { MarkdownModule } from 'angular2-markdown';
import { PostsHome } from './posts-home';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      MatTabsModule,
      MatIconModule,
      MarkdownModule.forRoot(),
      SideBarContainerModule
    ],
    declarations: [PostsHome],
    providers: [MenuItems, ComponentPageTitle]
  })
  export class PostsHomeModule {}
  