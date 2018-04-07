import gql from 'graphql-tag';

export const suggest = gql`
query suggest($content: String!) {
    suggest(content: $content){
        data
  }
}
`;