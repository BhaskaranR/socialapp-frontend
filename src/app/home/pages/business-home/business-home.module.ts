import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatTabsModule, MatSidenavModule, MatSelectModule, MatInputModule } from '@angular/material';
import { routing } from './business-home.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessHomeComponent } from './business-home.component';
import { FormsModule } from '@angular/forms';
import { CommentsModule } from '../comments';
import { ApolloModule } from 'apollo-angular';
import { BusinessListPageComponent } from './businesslist-page.component';
import { AvatarModule } from 'ngx-avatar';
import { PostsModule } from '@app/components/posts';
import { SharedModule } from '@app/shared/shared.module';
import { BusinessCoreModule } from '@app/home/pages/business-core';
import { AddBusinessComponent } from '@app/home/pages/business-core/components/add_business/addbusiness';

@NgModule({

    imports: [
        FlexLayoutModule,
        AvatarModule,
        PostsModule,
        CommentsModule,
        CommonModule,
        SharedModule,
        BusinessCoreModule,
        routing,
        SharedModule,
        FormsModule,
        MatTabsModule,
        MatSidenavModule,
        MatSelectModule, 
        MatInputModule 
    ],
    declarations: [
        BusinessHomeComponent,
        BusinessListPageComponent
    ],
    entryComponents: [
        AddBusinessComponent]
})
export class BusinessHomeModule { }
