import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHomeComponent } from './profile-home.component';
import { MatDialogModule, MatSidenavModule, MatMenuModule, MatIconModule, MatCardModule, 
    MatGridListModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentsModule } from '../comments';
import { AvatarModule } from 'ngx-avatar';
import { PostsModule } from '@app/components/posts';
import { PeopleModule } from '@app/components/people';
import { ParallaxModule } from '@app/components/parallax/parallax.module';
import { EditProfileComponent } from '@app/components/editprofile/editprofile.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileHomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(profileRoutes);

@NgModule({
    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        CommentsModule,
        CommonModule,
        PeopleModule,
        MatCardModule,
        MatDialogModule,
        MatSidenavModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatGridListModule,
        ParallaxModule,
        routing
    ],
    declarations: [
        EditProfileComponent,
        ProfileHomeComponent]
})
export class ProfileHomeModule { }
