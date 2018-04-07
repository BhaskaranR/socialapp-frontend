import gql from 'graphql-tag';

export const favorPost = gql`
  mutation favorPost($postId: ID, $likeType:PostlikeTypes){
    favorPost(postId: $postId, like: $likeType){
      ok
      error{
          path
          message
      }
    }
  }
`;