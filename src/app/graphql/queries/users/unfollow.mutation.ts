import gql from 'graphql-tag';

export const unfollow = gql`
  mutation Unfollow($followerId : String!){
    unfollow(followerId: $followerId){
      ok
      errors{
          path
          message
      }
    }
  }
`;