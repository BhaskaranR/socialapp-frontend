import { toIdValue } from 'apollo-utilities';
import gql from 'graphql-tag';
import { query } from '../models/settings';

export const defaults = {
    notes: [],
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
            const data = cache.readQuery({
                query,
            });
            console.log('settings', data);

            return data.settings || [];
        },
    },
};
