import gql from 'graphql-tag';

export const deletePost = gql`
  mutation deletePost($postId: String){
    deletePost(post: $post){
      ok
      error{
          path
          message
      }
    }
  }
`;