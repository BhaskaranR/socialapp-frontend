import gql from 'graphql-tag';
import { businessFragment } from './fragments';

export const editBiz = gql`
  mutation EditBiz($biz: EditBizInput){
    editBiz(biz: $biz){
      ok
      business:{
          ...BusinessFields
      }
      error{
          path
          message
      }
    }
  }

  ${businessFragment}
`;