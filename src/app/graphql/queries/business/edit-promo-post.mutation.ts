import gql from 'graphql-tag';

export const editPromoPost = gql`
  mutation EditPromoPost($post: PromoPostInput){
    editPromoPost(post: $post){
      ok
      error{
          path
          message
      }
    }
  }
`;