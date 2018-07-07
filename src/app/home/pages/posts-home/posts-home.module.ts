import { MatTabsModule, MatCardModule, MatRadioModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule } from 'angular2-markdown';
import { AvatarModule } from 'ngx-avatar';
import { MentionModule } from '@app/components/mention';
import { AgmCoreModule } from '@agm/core';
import { environment } from '@env/environment';
import { PostsHome } from './posts-home';
import { MenuItems } from '@app/shared/menu-items/menu-items';
import { ComponentPageTitle } from '@app/shared/page-title/page-title';
import { NewPostComponent } from './new-post/newpost/newpost';
import { FeaturePostsComponent } from './feature-posts/feature-posts.component';
import { RouterModule } from '@angular/router';
import { SideBarContainerModule } from '../../../shared/side-bar-container/side-bar-container.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      MatTabsModule,
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
      MatListModule,
      AvatarModule,
      MentionModule,
      SideBarContainerModule,
      AgmCoreModule.forRoot({
        libraries: ['places'],
        apiKey: environment.google_map_key
      })
    ],
    exports: [PostsHome],
    declarations: [PostsHome, 
        NewPostComponent,
        FeaturePostsComponent],
    providers: [MenuItems, ComponentPageTitle],
    entryComponents: [
        NewPostComponent,
        // NewPromoPostComponent,
        // CheckinComponent,
        // UserGroupListComponent
      ]
  })
  export class PostsModule {}
  