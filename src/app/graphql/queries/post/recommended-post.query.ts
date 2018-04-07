import gql from 'graphql-tag';
import {postFragment} from './fragments';

export const recommendedPosts = gql`
  mutation RecommendedPosts($feedType: FeedType!, $prev: String!, $next: String!, $count: Int!){
    recommendedPosts(feedType: $feedType, prev:$prev, next: $next, count: $count){
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