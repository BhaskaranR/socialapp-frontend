import gql from 'graphql-tag';

export const createPost = gql`
  mutation CreatePromoPost($post: PromoPostInput!, $file: File){
    createPromoPost(post: $post, file: $file){
      ok
      error{
          path
          message
      }
    }
  }
`;