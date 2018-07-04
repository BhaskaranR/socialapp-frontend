import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloLink } from 'apollo-link';
import { environment } from '@env/environment';

import { LoonaModule, LoonaLink } from '@loona/angular';

// import OptimisticLink from 'apollo-link-optimistic';
import SerializingLink from 'apollo-link-serialize';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import { createUploadLink } from 'apollo-upload-client';

import OptimisticLink from './optimistic-link';
import { redirects } from '@app/resolvers';
import { SettingsState } from '../settings/settings.state';
const uri = environment.apiBaseUrl + '/graphql';


export interface State {
  resolvers: any;
  defaults?: any;
  typeDefs?: string | string[];
}

export const ApolloGate = new InjectionToken<QueueLink>('apollo-gate');
export const State = new InjectionToken<State[]>('apollo-link-state');

export function createApolloGate() {
  return new QueueLink();
}

let cache: InMemoryCache;

cache = new InMemoryCache({
  dataIdFromObject: (obj: any) => {
    if (!obj) {
      return null;
    }

    const byType = ['Settings'];

    if (byType.indexOf(obj.__typename) !== -1) {
      return obj.__typename;
    }

    if (obj.id) {
      return obj.__typename ? `${obj.__typename}:${obj.id}` : obj.id;
    }

    return null;
  },
  cacheRedirects: redirects(cache),
});

persistCache({
  cache,
  storage: sessionStorage,
  key: 'ks-app',
  debug: true,
  debounce: 300,
});
function createApollo() {
  return (apollo: Apollo, httpLink: HttpLink, gate: ApolloLink, loonaLink: LoonaLink) => {
    return () => {
      const http = httpLink.create({
        uri: uri,
      });
      const optimistic = new OptimisticLink();
      const serializing = new SerializingLink();
      const retry = new RetryLink({
        delay: count => Math.min(300 * 2 ** count, 10000),
        attempts: {
          max: Number.POSITIVE_INFINITY,
        },
      });
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
      apollo.create({
        link: ApolloLink.from([
          loonaLink,
          optimistic,
          serializing as any,
          retry,
          middleware,
          gate,
          http]),
        cache
      });
    };
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule, LoonaModule.forRoot(cache, [SettingsState]), HttpLinkModule],
})
export class ApiModule {
  static forRoot() {
    return {
      ngModule: ApiModule,
      providers: [
        { provide: ApolloGate, useFactory: createApolloGate },
        {
          provide: APP_INITIALIZER,
          useFactory: createApollo(),
          deps: [Apollo, HttpLink, ApolloGate, LoonaLink],
          multi: true,
        },
      ],
    };
  }
}
