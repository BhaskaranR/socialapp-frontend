import { NgModule } from '@angular/core';
import { FeaturePostsComponent } from './feature-posts.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostDetailedPopupModule } from '../post-detailed/post-detail-popup.module';
import { PostsModule } from '@app/components/posts';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatCardModule, MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
} from '@angular/material';
import { SideBarContainerModule } from '@app/shared/side-bar-container/side-bar-container.module';
import { NewPostModule } from '@app/home/pages/new-post';

const routes: Routes = [
    {
        path: '',
        component: FeaturePostsComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
    imports: [
        PostsModule,
        PostDetailedPopupModule,
        CommonModule,
        FlexLayoutModule,
        SideBarContainerModule,
        MatRadioModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        NewPostModule,
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
