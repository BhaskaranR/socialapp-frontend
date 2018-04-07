import gql from 'graphql-tag';

export const referFriends = gql`
  mutation ReferFriends($emailIds : [String]!){
    referFriends(emailIds: $emailIds){
      ok
      errors{
          path
          message
      }
    }
  }
`;