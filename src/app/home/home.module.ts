import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { SettingsModule } from '@app/settings';
import { RoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StaticModule } from '@app/static';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    SettingsModule,
    RoutingModule,
    StaticModule
  ],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomeModule {}
