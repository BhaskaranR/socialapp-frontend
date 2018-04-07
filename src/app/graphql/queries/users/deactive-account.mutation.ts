import gql from 'graphql-tag';

export const deactivateAccount = gql`
  mutation DeactivateAccount{
    deactivateAccount{
      ok
      errors{
          path
          message
      }
    }
  }
`;

//tested passed