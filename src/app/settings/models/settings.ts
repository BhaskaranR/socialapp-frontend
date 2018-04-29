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
    settings {
      ...settingsFragment
    }
  }

  ${settingsFragment}
`;