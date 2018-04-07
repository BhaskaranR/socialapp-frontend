import gql from 'graphql-tag';

export const updateWorkHistory = gql`
  mutation UpdateWorkHistory($workHistory : WorkHistoryInput!){
    updateWorkHistory(workHistory: $workHistory){
      ok
      errors{
          path
          message
      }
    }
  }
`;