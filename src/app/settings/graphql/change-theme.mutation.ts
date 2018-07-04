import gql from 'graphql-tag';

export const changeTheme = gql`
mutation changeTheme($theme: String!) {
  changeTheme(theme: $theme) @client 
}`