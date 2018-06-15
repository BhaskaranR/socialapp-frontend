import gql from 'graphql-tag';

export const settingsFragment = gql`
  fragment settingsFragment on Settings {
    theme
    autoNightMode
    persist
  }
`;

export interface Settings {
    theme?: string;
    autoNightMode?: boolean;
    persist: boolean;
}

export const query = gql`
  {
    settings @client {
      ...settingsFragment
    }
  }

  ${settingsFragment}
`;

export const changeTheme = gql`
        mutation changeTheme($theme: String!) {
          changeTheme(theme: $theme) @client {
            ...settingsFragment
          }
        }
        ${settingsFragment}`


export const changeNightMode = gql`
        mutation changeAutoNightMode($autoNightMode: Boolean!) {
          changeAutoNightMode(autoNightMode: $autoNightMode) @client {
            ...settingsFragment
          }
        }
        ${settingsFragment}`