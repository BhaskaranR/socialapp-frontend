import gql from 'graphql-tag';
import {postFragment} from './fragments';

export const posts = gql`
  query FeaturedPosts($feedType: FeedType!, $prev: String!, $next: String!, $count: Int!){
    featuredPosts(feedType: $feedType, prev:$prev, next: $next, count: $count){
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