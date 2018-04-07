import gql from 'graphql-tag';

export const addReactionToComment = gql`
  mutation addReactionToComment($commentId:String){
    addReactionToComment(commentId: $commentId){
      ok
      error{
          path
          message
      }
    }
  }
`;