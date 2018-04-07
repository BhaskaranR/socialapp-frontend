import gql from 'graphql-tag';

export const unfollowBizfollowBiz = gql`
  mutation UnfollowBiz($bizId: String!){
    unfollowBiz(bizId: $bizId){
      ok
      error{
          path
          message
      }
    }
  }
`;