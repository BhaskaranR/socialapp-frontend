import {A11yModule, ARIA_DESCRIBER_PROVIDER} from '@angular/cdk/a11y';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {REACTIONS_SCROLL_STRATEGY_PROVIDER, Reactions, ReactionsComponent} from './reactions';
import { MatTooltipModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ReactionsFilterPipe } from './reactions.filter';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    OverlayModule,
    MatCommonModule,
    PlatformModule,
    A11yModule,
  ],
  exports: [Reactions, ReactionsComponent, ReactionsFilterPipe, MatCommonModule],
  declarations: [Reactions, ReactionsComponent, ReactionsFilterPipe],
  entryComponents: [ReactionsComponent],
  providers: [REACTIONS_SCROLL_STRATEGY_PROVIDER, ARIA_DESCRIBER_PROVIDER],
})
export class ReactionsModule {}
