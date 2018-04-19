import gql from 'graphql-tag';
import {userFragment , profileFragment}from './fragments';

export const getMe = gql`
query  {
  me{
    ...UserFields
    profile {
      ...ProfileFields
    }
  }
}

${userFragment}
${profileFragment}
`;