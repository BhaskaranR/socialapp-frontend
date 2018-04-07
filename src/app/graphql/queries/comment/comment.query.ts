import gql from 'graphql-tag';

import {commentsWithCursorFragment }from './fragments';

export const getComment = gql`
query Comment($postId: String!, $prev: String, $next: String, $limit: Int) {
    comment(postId: $postId, prev: $prev, next: $next, limit: $limit){
    ...CommentsWithCursorFields
  }
}

${commentsWithCursorFragment}
`;