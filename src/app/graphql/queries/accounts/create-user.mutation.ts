import gql from 'graphql-tag';

export const createUserMutation = gql`    
  mutation($serviceName: String!, $user: CreateUserInput!) {
    registerPassword(serviceName: $serviceName, user: $user) 
  }
`;
