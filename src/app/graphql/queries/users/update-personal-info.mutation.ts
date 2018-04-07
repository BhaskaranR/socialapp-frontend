import gql from 'graphql-tag';

export const updatePersonalInfo = gql`
  mutation UpdatePersonalInfo($personalInfo : PersonalInfoInput!){
    updatePersonalInfo(personalInfo: $personalInfo){
      ok
      errors{
          path
          message
      }
    }
  }
`;