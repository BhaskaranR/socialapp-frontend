import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { AppRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { offlineCheck } from '@app/core/common/offline';
import { GraphQLModule } from '@app/core/graphql/apollo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { ErrorComponent } from '@app/error/error.component';
import { WelcomeModule } from './welcome/welcome.module';
import { HomeModule } from '@app/home/home.module';


export function initializer(auth: AuthenticationService): () => Promise<any> {
  return async () => {
    await offlineCheck();
    await auth.resumeSession();
  };
}

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    // core & shared
    CoreModule,
    SharedModule,
    // features
    GraphQLModule,
    // app
    WelcomeModule,
    HomeModule,
    AppRouting
  ],
  declarations: [AppComponent,
    NotFoundComponent,
    ErrorComponent,],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [AuthenticationService]
    }
  ],
  exports: [
    ErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
