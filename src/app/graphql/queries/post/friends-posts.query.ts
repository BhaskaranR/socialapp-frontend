import gql from 'graphql-tag';
import {postFragment} from './fragments';

export const friendsPosts = gql`
  mutation FriendsPosts($feedType: FeedType!, $prev: String!, $next: String!, $count: Int!){
    friendsPosts(feedType: $feedType, prev:$prev, next: $next, count: $count){
      hasNext
      hasPrevious
      next
      previous
      posts {
        ...PostFields
      }
    }
  }

  ${postFragment}
`;