import gql from 'graphql-tag';
import { postFragment } from '@app/graphql/queries/post/fragments';

export const createPost = gql`
  mutation CreatePost($post: PostInput!){
    createPost(post: $post){
      ok
      errors{
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