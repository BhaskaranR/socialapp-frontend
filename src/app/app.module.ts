import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core';

import { AppRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { offlineCheck } from '@app/core/common/offline';
// import { GraphQLModule } from '@app/core/graphql/apollo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { ErrorComponent } from '@app/error/error.component';
import { WelcomeModule } from './welcome/welcome.module';
import { HomeModule } from '@app/home/home.module';
import { SettingsModule } from '@app/settings';
import { environment } from '@env/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { resolvers, defaults, schema, redirects } from './resolvers';
import { ApiModule } from './api/api.module';


export function initializer(auth: AuthenticationService): () => Promise<any> {
  return async () => {
      await offlineCheck();
  //   return await auth.resumeSession();
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
    ApiModule.forRoot({ resolvers, defaults, schema, redirects }),
    // GraphQLModule,
    // app
    WelcomeModule,
    HomeModule,
    SettingsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
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
