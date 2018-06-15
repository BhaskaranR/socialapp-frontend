import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
