import gql from 'graphql-tag';

export const deleteComment = gql`
  mutation deleteComment($commentId:String, $comment: CommentInput){
    deleteComment(commentId: $commentId, comment: $comment){
      ok
      error{
          path
          message
      }
    }
  }
`;