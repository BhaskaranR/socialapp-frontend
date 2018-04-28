/* import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Query } from '../../graphql/types/types';
import { toIdValue } from 'apollo-utilities';


const uri = environment.apiBaseUrl + '/graphql';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  exports : [ApolloModule]
})
export class GraphQLModule {
  constructor(
    public apollo: Apollo,
    public httpLink: HttpLink,
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
    const dataIdFromObject = (object:any) => {
      switch (object.__typename) {
        case 'foo': return object.key; // use `key` as the primary key
        case 'bar': return `bar:${object.blah}`; // use `bar` prefix and `blah` as the primary key
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    };

    const cache = new InMemoryCache();
    this.apollo.create({
      link: middleware.concat(http),
      cache: cache
    });
  }
}
*/