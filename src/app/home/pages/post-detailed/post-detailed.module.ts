import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailedComponent } from './post-detailed.component';
import { MatButtonModule, MatIconModule, MatSidenavModule , MatMenuModule} from '@angular/material';
import { PostsModule } from '@app/components/posts';

const postdetailedRoutes: Routes = [
    {
        path: '',
        component: PostDetailedComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(postdetailedRoutes);

@NgModule({
  imports: [
    CommonModule,
    routing,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    PostsModule
  ],
  declarations: [PostDetailedComponent],
})
export class PostDetailedModule { }
