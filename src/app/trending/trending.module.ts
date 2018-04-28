import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';

import { ExamplesRoutingModule } from './trending-routing.module';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { TrendingComponent } from '@app/trending/trending.component';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    StoreModule.forFeature('examples', {
      stocks: stockMarketReducer
    }),
    EffectsModule.forFeature([StockMarketEffects])
  ],
  declarations: [
    TrendingComponent,
    StockMarketComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent
  ],
  providers: [StockMarketService]
})
export class TrendingModule {
  constructor() {}
}
