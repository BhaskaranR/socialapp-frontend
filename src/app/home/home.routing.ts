import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from '@app/settings';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/static';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuardService } from '@app/core/services/auth-guard.service';
import { CanActivateComponentSidenav } from '@app/home/pages/component-sidenav/component-sidenav-can-load-guard';
import { ComponentSidenav } from '@app/home/pages/component-sidenav/component-sidenav';
import { ComponentCategoryList } from '@app/home/pages/component-category-list/component-category-list';
import { ComponentList } from '@app/home/pages/component-list';
import { ComponentViewer, ComponentOverview, ComponentApi, ComponentExamples } from '@app/home/pages/component-viewer/component-viewer';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                data: {
                    title: 'Settings'
                }
            },
            {path: '', redirectTo: '/social/feeds', pathMatch: 'full'},
            {
                path: ':section',
                component: ComponentSidenav,
                children: [
                    { path: '', redirectTo: 'feeds', pathMatch: 'full' },
                    {
                        path: 'feeds',
                        children: [
                           // { path: '', component: ComponentCategoryList },
                           // { path: ':id', component: ComponentList },
                        ]
                    }
                    /*,
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: '../posts-home/posts-home.module#PostsHomeModule',
                data: {
                    animation: 'home'
                }
            }*/]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
