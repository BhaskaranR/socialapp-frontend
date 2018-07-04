import gql from 'graphql-tag';

export const changeNightMode = gql`
mutation changeAutoNightMode($autoNightMode: Boolean!) {
  changeAutoNightMode(autoNightMode: $autoNightMode) @client 
}`;