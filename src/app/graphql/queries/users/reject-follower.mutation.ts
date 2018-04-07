import gql from 'graphql-tag';

export const rejectFollower = gql`
  mutation RejectFollow($followerId : String!){
    approveFollower(followerId: $followerId){
      ok
      errors{
          path
          message
      }
    }
  }
`;