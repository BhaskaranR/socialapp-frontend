import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@app/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '**', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
