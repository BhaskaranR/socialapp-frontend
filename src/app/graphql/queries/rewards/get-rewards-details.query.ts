import gql from 'graphql-tag';

export const getRewardsDetail = gql`
query {
    getRewardsDetail{
        month
        year
        points
        cashPoints
  }
}
`;