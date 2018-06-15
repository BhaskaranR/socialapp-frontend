import { Injectable, Inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs/operators';
import QueueLink from 'apollo-link-queue';

import gql from 'graphql-tag';

import { ApolloGate } from './api/api.module';

@Injectable({
    providedIn: 'root',
})
export class NetworkService implements OnInit {
    constructor(
        private apollo: Apollo,
        @Inject(ApolloGate) private gate: QueueLink,
    ) { }

    ngOnInit() {
        Offline.on('up', () => {
            this.online()
        });
        Offline.on('down', () => {
            this.offline()
        });
    }

    online() {
        return this.apollo
            .mutate({
                mutation: gql`
          mutation goOnline {
            online @client
          }
        `,
            })
            .pipe(
                tap(() => {
                    this.gate.open();
                }),
        );
    }

    offline() {
        return this.apollo
            .mutate({
                mutation: gql`
          mutation goOffline {
            offline @client
          }
        `,
            })
            .pipe(
                tap(() => {
                    this.gate.close();
                }),
        );
    }
}
