import gql from 'graphql-tag';

export const referBiz = gql`
  mutation ReferBiz($userId: String, $bizId: String){
    referBiz(userId: $userId, bizId:$bizId){
      ok
      error{
          path
          message
      }
    }
  }
`;