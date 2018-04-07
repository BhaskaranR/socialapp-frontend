import gql from 'graphql-tag';

export const getRewards = gql`
query {
    getRewards{
        pointsInCash
        currentPoints
  }
}
`;