import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatTabsModule } from '@angular/material';
import { routing } from './business-home.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { PostsModule } from '@app/components/posts';
import { BusinessCoreModule } from '@app/home/pages/business-core';

import { BusinessHomeComponent } from './business-home.component';
import { BusinessListPageComponent } from './businesslist-page.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        CommonModule,
        BusinessCoreModule,
        routing,
        MatTabsModule
    ],
    declarations: [
        BusinessHomeComponent,
        BusinessListPageComponent
    ]
})
export class BusinessHomeModule { }
