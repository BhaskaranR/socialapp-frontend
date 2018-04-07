import gql from 'graphql-tag';

export const forgotPassword = gql`
  mutation forgotPassword($newPassword: ForgotPassword){
    forgotPassword(newPassword: $newPassword){
      ok
      error{
          path
          message
      }
    }
  }
`;