import gql from 'graphql-tag';
import {postFragment} from './fragments';

export const trendingPosts = gql`
  mutation TrendingPosts($feedType: FeedType!, $prev: String!, $next: String!, $count: Int!){
    trendingPosts(feedType: $feedType, prev:$prev, next: $next, count: $count){
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