import gql from 'graphql-tag';

export const getPlacesNearby = gql`
query getPlacesNearby($nearby: GetNearByInput) {
    getPlacesNearby(nearby: $nearby){
        id
        title
        distance
        geotag {
            type
            coordinates {
                lat
                long
            }
        }
  }
}
`;