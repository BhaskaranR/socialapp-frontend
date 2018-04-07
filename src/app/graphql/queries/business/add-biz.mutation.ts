import gql from 'graphql-tag';
import { businessFragment } from './fragments';

export const addBiz = gql`
  mutation AddBiz($biz: NewBizInput){
    addBiz(biz: $biz){
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