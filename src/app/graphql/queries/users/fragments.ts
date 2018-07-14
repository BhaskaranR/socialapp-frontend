import gql from 'graphql-tag';

export const photoUrlFragment = gql`
fragment PhotoUrlFields on PhotoUrl{
    id
    xlarge
    large
    normal
    small
  }
`;

export const personalContactFragment = gql`
fragment PersonalContactFields on PersonalContact {
    website{
        email
        emailType
    }
    phonenumber{
        phoneNumber
        phoneType
    }
    address {
        address
    }
    visibility
}
`;

export const personalInfoFragment = gql`
fragment PersonalInfoFields on PersonalInfo {
    gender
    birthday
    occupation
    visibility
}
`;

export const customUrlsFragment = gql`
fragment CustomUrlsFields on CustomUrls {
    customUrls
    visibility
}
`;

export const placesHistoryFragment = gql`
fragment placesHistoryFields on PlacesHistory {
    placesHistory {
        currentPlace
        livedPlaces
    }
    visibility
}
`;

export const workHistoryFragment = gql`
fragment WorkHistoryFields on WorkHistory {
    workHistory
    visibility
}
`;

export const storyFragment = gql`
fragment StoryFields on Story {
    story
    tagline
}
`;

export const educationHistoryFragment = gql`
fragment EducationHistoryFields on EducationHistory {
    schoolName
    major
    year
    endyear
    description
    visibility
    educationHistory {
        schoolName
        major
        year
        endyear
        description
    }
}
`;


export const profileFragment= gql`
fragment ProfileFields on Profile {
    name
    fbId
    googlePlusId
    firstName
    lastName
    requesting_device_id
    strategy
    avatarId
    images {
        ...PhotoUrlFields
    }
    userPersonalContact {
        ...PersonalContactFields
    }
    personalContact {
        ...PersonalContactFields
    }
    personalInfo {
        ...PersonalInfoFields
    }
    userCustomUrls {
        ...CustomUrlsFields
    }
    placesHistory {
        ...placesHistoryFields
    }
    workHistory {
        ...WorkHistoryFields
    }
    educationHistory {
        ...EducationHistoryFields
    }
    userStory {
        ...StoryFields
    }
    backgroundImage {
        ...PhotoUrlFields
    }
    profileSet
}

${photoUrlFragment}
${personalContactFragment}
${personalInfoFragment}
${customUrlsFragment}
${storyFragment}
${educationHistoryFragment}
${workHistoryFragment}
${placesHistoryFragment}
`;


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

export const businessFragment = gql`
fragment BusinessFields on Business{
    _id
    user {
        ...UserFields
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
    followersCount
}

${userFragment}
`;