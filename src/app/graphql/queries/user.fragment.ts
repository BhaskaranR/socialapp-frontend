import gql from 'graphql-tag';

import {userFragment , profileFragment} from './users/fragments';

export const userFieldsFragment = gql`
  fragment UserFields on User {
    ...UserFields
    profile {
      ...ProfileFields
    }
  }
  ${userFragment}
  ${profileFragment}
`;
