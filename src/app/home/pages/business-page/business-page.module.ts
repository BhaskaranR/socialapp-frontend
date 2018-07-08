import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommentsModule } from '../comments';
import { BusinessPageComponent } from './business-page.component';
import { MatButtonModule, MatCardModule, MatTabsModule, MatIconModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatButtonToggleModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AvatarModule } from 'ngx-avatar';
import { PostsModule } from '@app/components/posts';
import { SharedModule } from '@app/shared/shared.module';
import { PeopleModule } from '@app/components/people';
import { ParallaxModule } from '@app/components/parallax/parallax.module';
import { NewPostModule } from '@app/home/pages/new-post';

const bizpageRoutes: Routes = [
    {
        path: '',
        component: BusinessPageComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(bizpageRoutes);

@NgModule({
    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        CommentsModule,
        CommonModule,
        SharedModule,
        PeopleModule,
        NewPostModule,
        MatToolbarModule,
        MatButtonToggleModule,
        ParallaxModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU&callback=myMap'}),
        routing
    ],
    declarations: [
        BusinessPageComponent]
})
export class BusinessPageModule { }
