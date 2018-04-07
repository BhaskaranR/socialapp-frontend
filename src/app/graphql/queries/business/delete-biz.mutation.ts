import gql from 'graphql-tag';

export const deleteBiz = gql`
  mutation DeleteBiz($bizId: String){
    deleteBiz(bizId: $bizId){
      ok
      error{
          path
          message
      }
    }
  }
`;