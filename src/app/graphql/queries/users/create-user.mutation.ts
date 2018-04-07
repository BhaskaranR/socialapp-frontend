import gql from 'graphql-tag';

export const createUser = gql`
  mutation createUser($user : CreateUserInput!)
  {
    createUser(user: $user)
  }
`;

//tested