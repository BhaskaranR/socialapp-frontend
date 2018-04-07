import gql from 'graphql-tag';

export const deletePhotoFromPost = gql`
  mutation DeletePhotoFromPost($id: ID!, $postId: ID!){
    deletePhotoFromPost(id: $id, postId: $postId){
      ok
      error{
          path
          message
      }
    }
  }
`;