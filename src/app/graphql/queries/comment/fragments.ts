import gql from 'graphql-tag';


export const userFragment = gql`
fragment UserFields on User {
    id
    avatar
    email
    username
    name
    postsCount
    followingCount
    followersCount
}
`;
export const commentFragment = gql`
fragment CommentFields on Comment{
    _id
    user {
        ...UserFields
    }
    content
    creationTime
    fromServer
    tags
    reactions {
        username
        icon
    }
}

${userFragment}
`;

export const commentsWithCursorFragment = gql`
fragment CommentsWithCursorFields on CommentsWithCursor{
    hasNext
    hasPrevious
    next
    previous
    results {
        ...CommentFields
    }
}

${commentFragment}
`;