import gql from 'graphql-tag';

export const createPost = gql`
  mutation editPost($post: PostUpdateInput){
    editPost(post: $post){
      ok
      error{
          path
          message
      }
    }
  }
`;