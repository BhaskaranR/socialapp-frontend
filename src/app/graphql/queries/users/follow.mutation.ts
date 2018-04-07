import gql from 'graphql-tag';

export const follow = gql`
  mutation Follow($followingId : String!){
    follow(followingId: $followingId){
      ok
      errors{
          path
          message
      }
    }
  }
`;