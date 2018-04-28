import { toIdValue } from 'apollo-utilities';
import gql from 'graphql-tag';

import { settingsFragment } from '../models/settings';

const query = gql`
  {
    notes {
      ...noteFragment
    }
  }

  ${settingsFragment}
`;

export const defaults = {
  notes: [],
};

export const resolvers = {
  Mutation: {
    changeTheme: (_, args, { cache }) => {
        const data = cache.readQuery({
          query,
        });
  
        console.log('notes', data);
  
        return {
            theme: args,
            autoNightMode: data.autoNightMode,
            persist: data.persist
        };
      },

      changeNightMode: (_, args, { cache }) => {
        const data = cache.readQuery({
          query,
        });
  
        console.log('notes', data);
  
        return {
            theme: data.theme,
            autoNightMode: args,
            persist: data.persist
        };
      },
      persist: (_, args, { cache }) => {
        const data = cache.readQuery({
          query,
        });
  
        console.log('notes', data);
  
        return {
            theme: data.theme,
            autoNightMode: data.autoNightMode,
            persist: args
        };
      },
    addNote: (_, args, { cache }) => {
      const data = cache.readQuery({
        query,
      });

      console.log('notes', data);

      return {
        id: 'temp-1',
        title: args.title,
        text: args.text,
      };
    },
  },
  Query: {
    settings: (_, args, { cache }) => {
      const data = cache.readQuery({
        query,
      });

      console.log('settings', data);

      return data.settings || [];
    },
  },
};
