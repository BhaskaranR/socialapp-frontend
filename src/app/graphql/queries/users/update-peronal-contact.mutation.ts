import gql from 'graphql-tag';

export const updatePersonalContact = gql`
  mutation UpdatePersonalContact($personalContact : PersonalContactInput!){
    updatePersonalContact(personalContact: $personalContact){
      ok
      errors{
          path
          message
      }
    }
  }
`;