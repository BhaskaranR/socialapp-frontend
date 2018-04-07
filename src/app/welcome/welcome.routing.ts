import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from '@app/settings';
import { WelcomeComponent } from '@app/welcome/welcome.component';
import { AboutComponent } from '@app/static';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
    {
        path: 'login',
        component: WelcomeComponent,
        children: [
            {
                path: '',
                component: AboutComponent
            },
            {
                path: 'settings',
                component: SettingsComponent,
                data: {
                    title: 'Settings'
                }
            },
            {
                path: 'trending',
                loadChildren: 'app/trending/trending.module#TrendingModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
