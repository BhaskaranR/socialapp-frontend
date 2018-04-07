import gql from 'graphql-tag';

export const createPost = gql`
  mutation deletePhoto($id: ID){
    deletePhoto(id: $id){
      ok
      error{
          path
          message
      }
    }
  }
`;