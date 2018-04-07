import gql from 'graphql-tag';

import {businessFragment }from './fragments';

export const getRecommendedBusiness = gql`
query {
    getRecommendedBusiness(){
      cursor
      businessArray {
          ...BusinessFields
      }
  }
}

${businessFragment}
`;