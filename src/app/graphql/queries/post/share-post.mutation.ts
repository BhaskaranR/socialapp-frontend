import gql from 'graphql-tag';

export const sharePost = gql`
  mutation SharePost($postId: ID!, $comment: String!){
    sharePost(postId: $postId, comment: $comment){
      ok
      error{
          path
          message
      }
    }
  }
`;