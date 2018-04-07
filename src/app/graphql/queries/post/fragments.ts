import gql from 'graphql-tag';

export const geoTagFragment = gql`
fragment GeoTagFields on GeoTag{
    type
    coordinates{
        lat
        long
    }
    title
    placeId
  }
`;

export const userFragment = gql`
fragment UserFields on User{
    id
    name
    status
  }
`;

export const likeByPostFragment = gql`
fragment LikeByPostFields on LikeByPost{
    user{
        id
        name
        status
    }
    like
  }
`;

export const photoUrlFragment = gql`
fragment PhotoUrlFields on PhotoUrl{
    id
    xlarge
    large
    normal
    small
  }
`;

export const bookMarkPostFragment = gql`
fragment BookMarkPostFragment on BookMarkPost{
    user {
        id 
        name
        status
    }
    bookMark
  }
`;


export const postFragment = gql`
fragment PostFields on Post{
    _id
    title
    content
    mentions
    BizId
    geotag {
      ...GeoTagFields
    }
    photos {
      ...PhotoUrlFields
    }
    withFriends {
      ...UserFields
    }
    postType
    visibility
    user {
      ...UserFields
    }
    shares
    likes {
      ...LikeByPostFields
    }
    bookmarks {
      ...BookMarkPost
    }
    fileUrl {
      ...PhotoUrlFields
    }
    commentsCount
    create_date
    modified_date
  }

  ${geoTagFragment}
  ${photoUrlFragment}
  ${userFragment}
  ${likeByPostFragment}
  ${bookMarkPostFragment}
`;

