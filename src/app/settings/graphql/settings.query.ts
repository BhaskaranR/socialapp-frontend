import gql from 'graphql-tag';
import { settingsFragment } from './settings.fragment';

export const settingsQuery = gql`
    query settings {
        settings @client {
            ...settingsFragment
        }
      }
${settingsFragment}
`;

