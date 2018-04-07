import gql from 'graphql-tag';

import {businessFragment }from './fragments';

export const getBusiness = gql`
query GetBusiness($bizId: String!) {
    getBusiness(bizId: $bizId){
    ...BusissFields
  }
}

${businessFragment}
`;