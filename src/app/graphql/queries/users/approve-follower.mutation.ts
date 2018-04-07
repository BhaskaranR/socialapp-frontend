import gql from 'graphql-tag';

export const approveFollower = gql`
  mutation ApproveFollower($followerId : String!){
    approveFollower(followerId: $followerId){
      ok
      errors{
          path
          message
      }
    }
  }
`;

//tested