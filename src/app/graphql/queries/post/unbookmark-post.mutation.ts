import gql from 'graphql-tag';

export const unbookMarkPost = gql`
  mutation UnbookMarkPost($postId: ID!, $bookMark: Bookmark!){
    unbookMarkPost(postId: $postId, bookMark: $bookMark){
      ok
      error{
          path
          message
      }
    }
  }
`;