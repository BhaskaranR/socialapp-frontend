import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TrendingComponent } from './trending.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { AuthGuardService } from '@app/core/services/auth-guard.service';
import { ParentComponent } from '@app/trending/theming/parent/parent.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingComponent,
    children: [
      {
        path: '',
        redirectTo: 'feeds',
        pathMatch: 'full'
      },
      
      {
        path: 'photos',
        component: ParentComponent,
        data: {
          title: 'Photos'
        }
      },
      {
        path: 'videos',
        component: AuthenticatedComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Videos'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
