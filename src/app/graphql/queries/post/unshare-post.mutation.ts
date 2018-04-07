import gql from 'graphql-tag';

export const unsharePost = gql`
  mutation UnsharePost($postId: ID!){
    unsharePost(postId: $postId){
      ok
      error{
          path
          message
      }
    }
  }
`;