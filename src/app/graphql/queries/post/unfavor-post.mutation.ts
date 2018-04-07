import gql from 'graphql-tag';

export const unfavorPost = gql`
  mutation UnfavorPost($postId: ID!, $like:PostLikeTypes!){
    unfavorPost(postId: $postId, like:$like){
      ok
      error{
          path
          message
      }
    }
  }
`;