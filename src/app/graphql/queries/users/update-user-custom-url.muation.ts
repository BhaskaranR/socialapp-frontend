import gql from 'graphql-tag';

export const updateUserCustomeUrl = gql`
  mutation UpdateUserCustomeUrl($customUrls : [PersonalInfoInput]!){
    updateUserCustomeUrl(customUrls: $customUrls){
      ok
      errors{
          path
          message
      }
    }
  }
`;