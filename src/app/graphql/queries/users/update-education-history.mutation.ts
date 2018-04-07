import gql from 'graphql-tag';

export const updateEducationHistory = gql`
  mutation UpdateEducationHistory($educationHistory : Education!){
    updateEducationHistory(educationHistory: $educationHistory){
      ok
      errors{
          path
          message
      }
    }
  }
`;