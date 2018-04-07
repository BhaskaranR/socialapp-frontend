import gql from 'graphql-tag';

export const followBiz = gql`
  mutation FollowBiz($bizId: String!){
    followBiz(bizId: $bizId){
      ok
      error{
          path
          message
      }
    }
  }
`;