import gql from 'graphql-tag';
import {postFragment} from './fragments';

export const createPost = gql`
  mutation CreatePost($post: PostInput!){
    createPost(post: $post){
      ok
      error{
          path
          message
      }
      post{
        ...PostFields
      }
    }
  }

  ${postFragment}
`;