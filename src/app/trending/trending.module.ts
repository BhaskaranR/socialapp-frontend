import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { ExamplesRoutingModule } from './trending-routing.module';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TrendingComponent } from '@app/trending/trending.component';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
  ],
  declarations: [
    TrendingComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent
  ],
})
export class TrendingModule {
  constructor() {}
}
