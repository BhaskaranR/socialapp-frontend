import gql from 'graphql-tag';
import { loginFieldsFragment } from './login-fields.fragment';

export const serviceAuthenticateMutation = (userFieldsFragment) => gql`
mutation($serviceName: String!, $userFields: PasswordLoginType!) {
    serviceAuthenticate(serviceName: $serviceName, userFields : $userFields) {
      sessionId
      ...LoginFields
      user {
        id
        ...UserFields
      }
    }
  }
  
  ${userFieldsFragment}
  ${loginFieldsFragment}
`;
