import gql from 'graphql-tag';

export const settingsFragment = gql`
  fragment settingsFragment on Settings {
    theme
    autoNightMode
    persist
  }
`;