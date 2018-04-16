import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  StoreModule, Store, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '@env/environment';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthGuardService } from '@app/core/services/auth-guard.service';
import { AccountsClient } from './services/account.service';
import { AccountsClientConfiguration } from '@app/core/accounts/config';
import { TransportInterface } from './accounts/transport-interface';
import { AccountsState, reducer } from './accounts';
import { Apollo } from 'apollo-angular';
import { AccountGraphQLClient } from './services/account-graphql.service';



const options: AccountsClientConfiguration = {
  storeKey: 'accounts',
  passwordHashAlgorithm: "sha256",
  tokenStoragePrefix:"",
  onSignedOutHook: () => null,
  onEnrollAccountHook: () => null,
  onResetPasswordHook: () => null,
  onVerifyEmailHook: () => null,
  onSignedInHook: () => null,
};

export function provideAccountClientService(options: AccountsClientConfiguration) {
  return {
    provide: AccountsClient,
    useFactory: (
      storage: LocalStorageService,
      store: Store<AccountsState>,
      transport: AccountGraphQLClient) => {
        return new AccountsClient(options, storage, store, transport)
      },
    deps: [LocalStorageService, Store, AccountGraphQLClient]
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [LocalStorageService, AuthGuardService,
    AccountGraphQLClient,
    provideAccountClientService(options),
    { provide: "storage", useClass: LocalStorageService },
    { provide: "store", useClass: Store },
    { provide: "transport", useExisting: AccountGraphQLClient },
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
