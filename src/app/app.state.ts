import { DataProxy } from 'apollo-cache';
import { State } from './api/api.module';
import gql from 'graphql-tag';

interface Context {
  cache: DataProxy;
}

const typeDefs = `
  enum NetoworkStatus = 'offline' | 'online';

  type AppState {
    networkStatus: NetoworkStatus
  }

  type Query {
    appState: AppState
  }

  type Mutation {
    offline: Boolean
    online: Boolean
  }
`;

const query = gql`
  {
    appState {
      networkStatus
    }
  }
`;

const changeNetworkStatus = (cache: DataProxy, status) => {
  cache.writeData({
    data: {
      appState: {
        networkStatus: status,
        __typename: 'AppState',
      },
    },
  });
};

export const appState: State = {
  typeDefs,
  defaults: {
    appState: {
      networkStatus: 'online',
      __typename: 'AppState',
    },
  },
  resolvers: {
    Query: {
      appState: (_, args, { cache }: Context) => {
        return cache.readQuery({
          query,
        });
      },
    },
    Mutation: {
      offline: (_, args, { cache }: Context) => {
        changeNetworkStatus(cache, 'offline');
      },
      online: (_, args, { cache }: Context) => {
        changeNetworkStatus(cache, 'online');
      },
    }
  }
};
