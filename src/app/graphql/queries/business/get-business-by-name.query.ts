import gql from 'graphql-tag';

import {businessFragment }from './fragments';

export const getBusinessByName = gql`
query GetBusinessByName($name: String!) {
    getBizNearby(name: $name){
    ...BusisgetBusinessByNamesFields
  }
}

${businessFragment}
`;