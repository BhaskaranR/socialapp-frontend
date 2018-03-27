import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from '@app/settings';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/static';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuardService } from '@app/core/services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent, canActivate : [AuthGuardService], canActivateChild : [AuthGuardService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
