import gql from 'graphql-tag';

export const bookMarkPost = gql`
  mutation BookMarkPost($postId: ID!, $bookMark: Bookmark!){
    bookMarkPost(postId: $postId, bookMark: $bookMark){
      ok
      error{
          path
          message
      }
    }
  }
`;