import gql from 'graphql-tag';

export const updateUserStory = gql`
  mutation UpdateUserStory($userStory : StoryInput!){
    updateUserStory(userStory: $userStory){
      ok
      errors{
          path
          message
      }
    }
  }
`;