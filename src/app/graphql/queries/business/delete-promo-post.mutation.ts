import gql from 'graphql-tag';

export const deletePromoPost = gql`
  mutation DeletePromoPost($postId: String){
    deletePromoPost(postId: $postId){
      ok
      error{
          path
          message
      }
    }
  }
`;