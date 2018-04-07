import gql from 'graphql-tag';

export const updateUserPlaceHistory = gql`
  mutation UpdateUserPlaceHistory($placesHistory : PlacesHistoryInput!){
    updateUserPlaceHistory(placesHistory: $placesHistory){
      ok
      errors{
          path
          message
      }
    }
  }
`;