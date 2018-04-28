import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class StaticModule {}
