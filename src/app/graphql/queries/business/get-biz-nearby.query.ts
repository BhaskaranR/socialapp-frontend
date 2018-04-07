import gql from 'graphql-tag';

import {businessFragment }from './fragments';

export const getBizNearby = gql`
query GetBizNearby($nearBiz: BusinessNearbyInput) {
    getBizNearby(nearBiz: $nearBiz){
    ...BusissFields
  }
}

${businessFragment}
`;