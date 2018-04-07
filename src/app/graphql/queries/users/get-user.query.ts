import gql from 'graphql-tag';

import {userFragment , profileFragment}from './fragments';

export const getUser = gql`
query User($id: ID!) {
  user(id: $id){
    ...UserFields
    profile {
      ...ProfileFields
    }
  }
}

${userFragment}
${profileFragment}
`;