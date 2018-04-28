import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core';

import { RoutingModule } from './welcome.routing';
import { WelcomeComponent } from './welcome.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { offlineCheck } from '@app/core/common/offline';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaticModule } from '@app/static';
import { MatDatepickerModule, MatStepperModule, MatNativeDateModule } from '@angular/material';
import { ForgotPasswordComponent } from './components/forgot-password/forgotPassword.component';


export function initializer(auth: AuthenticationService): () => Promise<any> {
  return async () => {
    await offlineCheck();
    await auth.resumeSession();
  };
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    SharedModule,
    RoutingModule,
    StaticModule
  ],
  declarations: [WelcomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [AuthenticationService]
    }
  ]
})
export class WelcomeModule {}
