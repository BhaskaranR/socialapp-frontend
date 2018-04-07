import gql from 'graphql-tag';

import {businessFragment }from './fragments';

export const getPromoBizNearby = gql`
query GetPromoBizNearby($nearBiz: BusinessNearbyInput) {
    getBizNearby(nearBiz: $nearBiz){
    ...BusisgetPromoBizNearbysFields
  }
}

${businessFragment}
`;