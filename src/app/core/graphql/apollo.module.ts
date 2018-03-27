import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpHeaders } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { cacheReducer } from './apollo-angular-cache-ngrx/reducer';
import { NgrxCacheModule, _rootCacheSelector } from './apollo-angular-cache-ngrx/module';
import { NgrxCache } from './apollo-angular-cache-ngrx/cache';
import { createUploadLink } from 'apollo-upload-client';
import { environment as env } from '@env/environment';
import { State } from '@app/core';

const uri = env.apiBaseUrl + '/graphql';
//test
@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    NgrxCacheModule.forFeature(),
  ]
})
export class GraphQLModule {
  constructor(
    protected store: Store<State>,
    apollo: Apollo,
    httpLink: HttpLink,
    ngrxCache: NgrxCache
  ) {
    const http = httpLink.create({ uri });
    const middleware = new ApolloLink((operation, forward) => {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const access_token = tokens ? tokens.accessToken : null;
      if (access_token !== null) {
        operation.setContext({
          headers: new HttpHeaders().set('authorization', access_token)
        });
      }
      return forward(operation)
    })
    const link = middleware.concat(http);
    apollo.create({
      link: middleware.concat(http),
      cache: ngrxCache.create()
    });
  }
}