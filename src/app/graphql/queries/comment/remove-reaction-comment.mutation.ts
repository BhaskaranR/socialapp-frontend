import gql from 'graphql-tag';

export const removeReactionToComment = gql`
  mutation removeReactionToComment($commentId:String){
    removeReactionToComment(commentId: $commentId){
      ok
      error{
          path
          message
      }
    }
  }
`;