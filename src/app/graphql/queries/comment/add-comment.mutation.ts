import gql from 'graphql-tag';

export const addComment = gql`
  mutation AddComment($comment: CommentInput){
    addBiz(comment: $comment){
      ok
      error{
          path
          message
      }
    }
  }
`;