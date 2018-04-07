import gql from 'graphql-tag';


export const userFragment = gql`
fragment UserFields on User(){
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

export const businessFragment = gql`
fragment BisunessFields on Business(){
    _id
    user {
        ...userFields
    }
    referredBy {
        ...UserFields
    }
    bizName
    category {
        name
        category
    }
    zipcode
    address
    title
    website
    geotag
    followers {
        ...UserFields
    }
    followerCount
}

${userFragment}
`;