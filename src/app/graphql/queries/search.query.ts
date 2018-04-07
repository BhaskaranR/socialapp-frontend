import gql from 'graphql-tag';

export const search = gql`
query search($content: String!) {
    search(content: $content){
        data
  }
}
`;