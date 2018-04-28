import gql from 'graphql-tag';

export const settingsFragment = gql`
  fragment settingsFragment on Settings {
    theme
    autoNightMode
    persist
  }
`;

export interface Note {
    theme?: string;
    autoNightMode?: boolean;
    persist: boolean;
}
