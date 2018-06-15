import { toIdValue } from 'apollo-utilities';
import gql from 'graphql-tag';
import { query } from '../models/settings';


const settingsFragment = gql`
  fragment settingsFragment on Settings {
    theme
    autoNightMode
    persist
  }`;

export const defaults = {
    settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: false,
        persist: true,
        __typename: 'Settings'
    }
};

export const resolvers = {
    Mutation: {
        changeTheme: (_, args, { cache }) => {
            const data = cache.readQuery({
                query,
            });

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

            return {
                theme: data.theme,
                autoNightMode: data.autoNightMode,
                persist: args
            };
        }
    },
    Query: {
        settings: (_, args, { cache }) => {
            const id = 'Settings';
            const settings: any = cache.readFragment({
                fragment: settingsFragment,
                id,
            });
            return settings;
        },
    },
};
