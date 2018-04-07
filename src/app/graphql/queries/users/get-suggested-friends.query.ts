import gql from 'graphql-tag';
import {userFragment, businessFragment, profileFragment } from './fragments';

export const getUser = gql`
query SuggestedFriends($id: String!, $cursor: String, $count: Int) {
    suggestedFriends(id: $id, cursor: $cursor, count: $count){
        cursor
        usersArray{
            ...UserFields
            followersUsers(cursor:"", limit: 10) {
                cursor
                usersArray {
                    ...UserFields
                }
            }
            followingUsers(cursor:"", limit:10){
                cursor
                usersArray{
                    ...UserFields
                }
            }
            followingBusiness {
                ...BusinessFields
            }
            mybusinesses {
                ...BusinessFields
            }
            profile {
                ...ProfileFields
            }
        }
    }
}

${userFragment}
${businessFragment}
${profileFragment}
`;