/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql';

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;


export interface Query {
  me?: User | null; 
  getBizNearby?: (Business | null)[] | null; 
  getPromoBizNearby?: (Business | null)[] | null; 
  getBusiness?: Business | null; 
  getBusinessByName?: Business | null; 
  getRecommendedBusiness?: BusinessWithCursor | null; 
  messages?: MessagesWithCursor | null; 
  channelsByUser?: (Channel | null)[] | null; 
  channels?: (Channel | null)[] | null; 
  channelByName?: Channel | null; 
  comment?: CommentsWithCursor | null; 
  getGiphy: string; 
  getPlacesNearby?: (Place | null)[] | null; 
  featuredPosts: PostsWithCursor; 
  friendsPosts: PostsWithCursor; 
  trendingPosts: PostsWithCursor; 
  recommendedPosts: PostsWithCursor; 
  getRewards?: Reward | null; 
  getRewardsDetail?: (RewardsDetail | null)[] | null; 
  search: SearchResult; 
  suggest: SearchResult; 
  user?: User | null; 
  suggestedFriends?: UsersWithCursor | null; 
}

export interface User {
  id: string; 
  email?: string | null; 
  username?: string | null; 
  userPreferences?: UserPreferences | null; 
  status?: UserStatus | null; 
  avatar?: string | null; 
  name?: string | null; 
  lastLogin?: string | null; 
  channels?: (Channel | null)[] | null; 
  directMessages?: (Channel | null)[] | null; 
  profile?: Profile | null; 
  postsCount?: number | null; 
  followersCount?: number | null; 
  followingCount?: number | null; 
  referredUsers?: (User | null)[] | null; 
  followersUsers?: UsersWithCursor | null; 
  followingUsers?: UsersWithCursor | null; 
  followingBusiness?: (Business | null)[] | null; 
  mybusinesses?: (Business | null)[] | null; 
  post?: PostsWithCursor | null; 
  imagePost?: PostsWithCursor | null; 
  videoPost?: PostsWithCursor | null; 
  createdAt?: string | null; 
  modifiedAt?: string | null; 
  rewards?: Reward | null; 
  referredBy?: string | null; 
}

export interface UserPreferences {
  language?: string | null; 
  notificationDuration?: number | null; 
  unreadTrayIconAlert?: boolean | null; 
  useEmojis?: boolean | null; 
  convertAsciiToEmoji?: boolean | null; 
  autoLoadImages?: boolean | null; 
  saveMobileBandwith?: boolean | null; 
  collapseEmbeddedMeida?: boolean | null; 
  unreadRoomsMode?: boolean | null; 
  hideUserName?: boolean | null; 
  hideRoles?: boolean | null; 
  hideRightSideBarWithClick?: boolean | null; 
  hideAvatars?: boolean | null; 
  mergePrivateGroupsWithChannels?: boolean | null; 
  enterKeyBehaviour?: string | null; 
  viewMode?: string | null; 
  offlineEmailNotifications?: string | null; 
  highlights?: string | null; 
  newRoomNotificationSound?: string | null; 
  newMessageNotificationSound?: string | null; 
}

export interface Channel {
  id?: string | null; 
  name?: string | null; 
  description?: string | null; /** topic: TODOuserNotificationSettings: ChannelSettings */
  announcement?: string | null; 
  numberOfMembers?: number | null; 
  members?: (User | null)[] | null; 
  owners?: (User | null)[] | null; 
  direct?: boolean | null; 
  privateChannel?: boolean | null; 
  readOnly?: boolean | null; 
  archived?: boolean | null; 
  favorite?: boolean | null; 
  unseenMessages?: number | null; 
}

export interface Profile {
  fbId?: string | null; 
  googlePlusId?: string | null; 
  firstName?: string | null; 
  lastName?: string | null; 
  requesting_device_id?: string | null; 
  strategy?: string | null; 
  avatarId?: string | null; 
  images?: PhotoUrl | null; 
  userPersonalContact?: PersonalContact | null; 
  personalContact?: PersonalContact | null; 
  personalInfo?: PersonalInfo | null; 
  userCustomUrls?: CustomUrls | null; 
  placesHistory?: PlacesHistory | null; 
  workHistory?: WorkHistory | null; 
  educationHistory?: (EducationHistory | null)[] | null; 
  userStory?: Story | null; 
  backgroundImage?: PhotoUrl | null; 
  profileSet?: boolean | null; 
}

export interface PhotoUrl {
  id?: string | null; 
  xlarge?: string | null; 
  large?: string | null; 
  normal?: string | null; 
  small?: string | null; 
}

export interface PersonalContact {
  website?: (Email | null)[] | null; 
  phonenumber?: (Phone | null)[] | null; 
  address?: (Address | null)[] | null; 
  visibility?: string | null; 
}

export interface Email {
  email?: string | null; 
  emailType?: string | null; 
}

export interface Phone {
  phoneNumber?: string | null; 
  phoneType?: string | null; 
}

export interface Address {
  address?: string | null; 
}

export interface PersonalInfo {
  gender?: string | null; 
  birthday?: string | null; 
  occupation?: string | null; 
  visibility?: string | null; 
}

export interface CustomUrls {
  customUrls?: (string | null)[] | null; 
  visibility?: string | null; 
}

export interface PlacesHistory {
  placesHistory?: (Places | null)[] | null; 
  visibility?: string | null; 
}

export interface Places {
  currentPlace?: string | null; 
  livedPlaces?: (string | null)[] | null; 
}

export interface WorkHistory {
  workHistory?: (string | null)[] | null; 
  visibility?: string | null; 
}

export interface EducationHistory {
  schoolName?: string | null; 
  major?: string | null; 
  year?: number | null; 
  endyear?: number | null; 
  description?: string | null; 
  educationHistory?: (EducationHistory | null)[] | null; 
  visibility?: string | null; 
}

export interface Story {
  story?: string | null; 
  tagline?: string | null; 
}

export interface UsersWithCursor {
  cursor?: string | null; 
  usersArray?: (User | null)[] | null; 
}

export interface Business {
  _id?: string | null; 
  user?: User | null; 
  referredBy?: User | null; 
  bizName?: string | null; 
  category?: Category | null; 
  zipcode?: number | null; /** subCategory: Subcategory */
  address?: string | null; 
  title?: string | null; 
  website?: string | null; 
  geotag?: Geotag | null; 
  followers?: (User | null)[] | null; 
  followersCount?: number | null; 
}

export interface Category {
  name: string; 
  category: string; 
}

export interface Geotag {
  type?: string | null; 
  coordinates?: Coordinates | null; 
}

export interface Coordinates {
  lat: number; 
  long: number; 
}

export interface PostsWithCursor {
  hasNext: boolean; /** this will tell you if you have next set of records */
  hasPrevious: boolean; 
  next?: string | null; 
  previous?: string | null; 
  posts?: (Post | null)[] | null; 
}

export interface Post {
  _id: string; 
  title?: string | null; 
  content?: string | null; 
  mentions?: (string | null)[] | null; 
  BizId?: string | null; 
  geotag?: GeoTag | null; 
  photos?: (PhotoUrl | null)[] | null; 
  withFriends?: (User | null)[] | null; 
  postType?: string | null; 
  visibility?: PostVisibility | null; 
  user?: User | null; 
  shares?: (string | null)[] | null; 
  likes?: (LikeByPost | null)[] | null; 
  bookmarks?: (BookMarkPost | null)[] | null; 
  fileUrl?: (PhotoUrl | null)[] | null; 
  commentsCount?: number | null; 
  create_date?: string | null; /** comments(prev: String, next: String, limit: Int): CommentsWithCursor */
  modified_date?: string | null; 
}

export interface GeoTag {
  type?: string | null; 
  coordinates?: Coordinates | null; 
  title?: string | null; 
  placeId?: string | null; 
}

export interface LikeByPost {
  user?: User | null; 
  like?: string | null; 
}

export interface BookMarkPost {
  user?: User | null; 
  bookMark?: Bookmark | null; 
}

export interface Reward {
  pointsInCash?: number | null; 
  currentPoints?: number | null; 
}

export interface BusinessWithCursor {
  cursor?: string | null; 
  businessArray?: (Business | null)[] | null; 
}

export interface MessagesWithCursor {
  cursor?: string | null; 
  channel?: Channel | null; 
  messagesArray?: (Message | null)[] | null; 
}

export interface Message {
  id?: string | null; 
  author?: User | null; 
  content?: string | null; 
  creationTime?: string | null; 
  channel?: Channel | null; 
  fromServer?: boolean | null; 
  tags?: (string | null)[] | null; 
  userRef?: (User | null)[] | null; 
  channelRef?: (Channel | null)[] | null; 
  reactions?: (Reaction | null)[] | null; 
}

export interface Reaction {
  username?: string | null; 
  icon?: string | null; 
}

export interface CommentsWithCursor {
  hasNext: boolean; 
  hasPrevious: boolean; 
  next?: string | null; 
  previous?: string | null; 
  results?: (Comment | null)[] | null; 
}

export interface Comment {
  _id: string; 
  user?: User | null; 
  content?: string | null; 
  creationTime?: string | null; 
  fromServer?: boolean | null; 
  tags?: (string | null)[] | null; 
  reactions?: (Reaction | null)[] | null; 
}

export interface Place {
  id: string; 
  title: string; 
  distance: number; 
  geotag?: Geotag | null; 
}

export interface RewardsDetail {
  month?: number | null; 
  year?: number | null; 
  points?: number | null; 
  cashPoints?: number | null; 
}

export interface SearchResult {
  data: string; 
}

export interface Mutation {
  serviceAuthenticate?: LoginReturn | null; 
  refreshTokens?: LoginReturn | null; 
  logout?: boolean | null; 
  impersonate?: ImpersonateReturn | null; 
  registerPassword?: boolean | null; 
  verifyEmail?: boolean | null; 
  resetPassword?: boolean | null; 
  sendVerificationEmail?: boolean | null; 
  sendResetPasswordEmail?: boolean | null; 
  twoFactorSecret?: GeneratedSecret | null; 
  createPromoPost: GenericResponse; 
  editPromoPost: GenericResponse; 
  deletePromoPost: GenericResponse; 
  referBiz: GenericResponse; 
  addBiz: BizResponse; 
  editBiz: BizResponse; 
  deleteBiz: GenericResponse; 
  followBiz: GenericResponse; 
  unfollowBiz: GenericResponse; 
  leaveChannel?: boolean | null; 
  hideChannel?: boolean | null; 
  setStatus?: User | null; 
  createChannel?: Channel | null; 
  sendMessage?: Message | null; 
  deleteMessage?: boolean | null; 
  editMessage?: Message | null; 
  addReactionToMassage?: Message | null; 
  updateUserSettings?: User | null; 
  loginWithServiceAccessToken?: LoginResult | null; 
  addComment: GenericResponse; 
  deleteComment: GenericResponse; 
  editComment: GenericResponse; 
  addReactionToComment: GenericResponse; 
  removeReactionToComment: GenericResponse; 
  registerDevice?: GenericResponse | null; 
  unregisterDevice?: GenericResponse | null; 
  forgotPassword: GenericResponse; 
  createPost: NewPostResponse; 
  editPost: GenericResponse; 
  deletePost: GenericResponse; 
  uploadPhoto: string; 
  deletePhoto: GenericResponse; 
  deletePhotoFromPost: GenericResponse; 
  favorPost: GenericResponse; 
  unFavorPost: GenericResponse; 
  bookMarkPost: GenericResponse; 
  unbookMarkPost: GenericResponse; 
  sharePost: GenericResponse; 
  unsharePost: GenericResponse; 
  follow: GenericResponse; 
  unfollow: GenericResponse; 
  uploadProfilePhoto: PhotoUrl; 
  uploadProfileBackgroundPhoto: PhotoUrl; 
  deleteProfilePhoto: GenericResponse; 
  deleteBackgroundPhoto: GenericResponse; 
  approveFollower: GenericResponse; 
  rejectFollower: GenericResponse; 
  updatePersonalInfo: GenericResponse; 
  updatePersonalContact: GenericResponse; 
  updateUserCustomUrl: GenericResponse; 
  updateUserPlacesHistory: GenericResponse; 
  updateEducationHistory: GenericResponse; 
  updateWorkHistory: GenericResponse; 
  updateUserStory: GenericResponse; 
  deactiveAccount: GenericResponse; 
  referFriends: GenericResponse; 
}

export interface LoginReturn {
  sessionId?: string | null; 
  user?: User | null; 
  tokens?: Tokens | null; 
}

export interface Tokens {
  refreshToken?: string | null; 
  accessToken?: string | null; 
}

export interface ImpersonateReturn {
  authorized?: boolean | null; 
  tokens?: Tokens | null; 
  user?: User | null; 
}

export interface GeneratedSecret {
  ascii?: string | null; 
  hex?: string | null; 
  base32?: string | null; 
  qr_code_ascii?: string | null; 
  qr_code_hex?: string | null; 
  qr_code_base32?: string | null; 
  google_auth_qr?: string | null; 
  otpauth_url?: string | null; 
}

export interface GenericResponse {
  ok: boolean; 
  errors?: (Error | null)[] | null; 
}

export interface Error {
  path: string; 
  message?: string | null; 
}

export interface BizResponse {
  ok: boolean; 
  business?: Business | null; 
  errors?: (Error | null)[] | null; 
}

export interface LoginResult {
  accessToken?: string | null; 
  refreshToken?: string | null; 
}

export interface NewPostResponse {
  ok: boolean; 
  post?: Post | null; 
  errors?: (Error | null)[] | null; 
}

export interface Subscription {
  chatMessageAdded?: Message | null; 
  newComment?: Comment | null; 
  newReaction?: Comment | null; 
  postEvent?: PostEvent | null; 
  rewardEvent?: UserEvent | null; 
  userEvent?: UserEvent | null; 
}

export interface PostEvent {
  event?: Events | null; 
  post?: Post | null; 
}

export interface UserEvent {
  event?: Events | null; 
  user?: User | null; 
  notification?: Notification | null; 
}

export interface Notification {
  title: string; 
  body: string; 
  dir?: string | null; 
  tag?: string | null; 
  renotify?: boolean | null; 
  vibrate?: (number | null)[] | null; 
}

export interface AccountsError {
  message: string; 
  loginInfo?: string | null; 
  errorCode: number; 
}

export interface SubCategory {
  name: string; 
}

export interface ChannelSettings {
  disableNotification?: boolean | null; 
  audio?: string | null; 
  desktop?: string | null; 
  duration?: number | null; 
  mobile?: string | null; 
  mail?: string | null; 
  hideUnreadRoomStatus?: boolean | null; 
  unreadTrayIconAlert?: string | null; 
}

export interface RewardHistory {
  pointsInCash?: number | null; 
  availablePoints?: number | null; 
  redeemedPoints?: number | null; 
  otherPoints?: number | null; 
}

export interface UserGroup {
  _id?: string | null; 
  icon?: string | null; 
  name?: string | null; 
}

export namespace QueryResolvers {
  export interface Resolvers {
    me?: MeResolver; 
    getBizNearby?: GetBizNearbyResolver; 
    getPromoBizNearby?: GetPromoBizNearbyResolver; 
    getBusiness?: GetBusinessResolver; 
    getBusinessByName?: GetBusinessByNameResolver; 
    getRecommendedBusiness?: GetRecommendedBusinessResolver; 
    messages?: MessagesResolver; 
    channelsByUser?: ChannelsByUserResolver; 
    channels?: ChannelsResolver; 
    channelByName?: ChannelByNameResolver; 
    comment?: CommentResolver; 
    getGiphy?: GetGiphyResolver; 
    getPlacesNearby?: GetPlacesNearbyResolver; 
    featuredPosts?: FeaturedPostsResolver; 
    friendsPosts?: FriendsPostsResolver; 
    trendingPosts?: TrendingPostsResolver; 
    recommendedPosts?: RecommendedPostsResolver; 
    getRewards?: GetRewardsResolver; 
    getRewardsDetail?: GetRewardsDetailResolver; 
    search?: SearchResolver; 
    suggest?: SuggestResolver; 
    user?: UserResolver; 
    suggestedFriends?: SuggestedFriendsResolver; 
  }

  export type MeResolver = Resolver<User | null>;  export type GetBizNearbyResolver = Resolver<(Business | null)[] | null, GetBizNearbyArgs>;
  export interface GetBizNearbyArgs {
    nearBiz?: BusinessNearbyInput | null; 
  }

  export type GetPromoBizNearbyResolver = Resolver<(Business | null)[] | null, GetPromoBizNearbyArgs>;
  export interface GetPromoBizNearbyArgs {
    nearBiz?: BusinessNearbyInput | null; 
  }

  export type GetBusinessResolver = Resolver<Business | null, GetBusinessArgs>;
  export interface GetBusinessArgs {
    bizId: string; 
  }

  export type GetBusinessByNameResolver = Resolver<Business | null, GetBusinessByNameArgs>;
  export interface GetBusinessByNameArgs {
    name: string; 
  }

  export type GetRecommendedBusinessResolver = Resolver<BusinessWithCursor | null>;  export type MessagesResolver = Resolver<MessagesWithCursor | null, MessagesArgs>;
  export interface MessagesArgs {
    channelId?: string | null; 
    channelDetails?: ChannelNameAndDirect | null; 
    channelName?: string | null; 
    cursor?: string | null; 
    count?: number | null; 
    searchRegex?: string | null; 
  }

  export type ChannelsByUserResolver = Resolver<(Channel | null)[] | null, ChannelsByUserArgs>;
  export interface ChannelsByUserArgs {
    userId?: string | null; 
  }

  export type ChannelsResolver = Resolver<(Channel | null)[] | null, ChannelsArgs>;
  export interface ChannelsArgs {
    filter?: ChannelFilter | null; 
  }

  export type ChannelByNameResolver = Resolver<Channel | null, ChannelByNameArgs>;
  export interface ChannelByNameArgs {
    name: string; 
    isDirect: boolean; 
  }

  export type CommentResolver = Resolver<CommentsWithCursor | null, CommentArgs>;
  export interface CommentArgs {
    postId: string; 
    prev?: string | null; 
    next?: string | null; 
    limit?: number | null; 
  }

  export type GetGiphyResolver = Resolver<string, GetGiphyArgs>;
  export interface GetGiphyArgs {
    searchContent: string; 
  }

  export type GetPlacesNearbyResolver = Resolver<(Place | null)[] | null, GetPlacesNearbyArgs>;
  export interface GetPlacesNearbyArgs {
    nearby?: GetNearByInput | null; 
  }

  export type FeaturedPostsResolver = Resolver<PostsWithCursor, FeaturedPostsArgs>;
  export interface FeaturedPostsArgs {
    feedType: FeedType; 
    prev: string; 
    next: string; 
    count: number; 
  }

  export type FriendsPostsResolver = Resolver<PostsWithCursor, FriendsPostsArgs>;
  export interface FriendsPostsArgs {
    feedType: FeedType; 
    prev: string; 
    next: string; 
    count: number; 
  }

  export type TrendingPostsResolver = Resolver<PostsWithCursor, TrendingPostsArgs>;
  export interface TrendingPostsArgs {
    feedType: FeedType; 
    prev: string; 
    next: string; 
    count: number; 
  }

  export type RecommendedPostsResolver = Resolver<PostsWithCursor, RecommendedPostsArgs>;
  export interface RecommendedPostsArgs {
    feedType: FeedType; 
    prev: string; 
    next: string; 
    count: number; 
  }

  export type GetRewardsResolver = Resolver<Reward | null>;  export type GetRewardsDetailResolver = Resolver<(RewardsDetail | null)[] | null>;  export type SearchResolver = Resolver<SearchResult, SearchArgs>;
  export interface SearchArgs {
    content: string; 
  }

  export type SuggestResolver = Resolver<SearchResult, SuggestArgs>;
  export interface SuggestArgs {
    content: string; 
  }

  export type UserResolver = Resolver<User | null, UserArgs>;
  export interface UserArgs {
    id?: string | null; 
  }

  export type SuggestedFriendsResolver = Resolver<UsersWithCursor | null, SuggestedFriendsArgs>;
  export interface SuggestedFriendsArgs {
    id: string; 
    cursor?: string | null; 
    count?: number | null; 
  }

  
}

export namespace UserResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    email?: EmailResolver; 
    username?: UsernameResolver; 
    userPreferences?: UserPreferencesResolver; 
    status?: StatusResolver; 
    avatar?: AvatarResolver; 
    name?: NameResolver; 
    lastLogin?: LastLoginResolver; 
    channels?: ChannelsResolver; 
    directMessages?: DirectMessagesResolver; 
    profile?: ProfileResolver; 
    postsCount?: PostsCountResolver; 
    followersCount?: FollowersCountResolver; 
    followingCount?: FollowingCountResolver; 
    referredUsers?: ReferredUsersResolver; 
    followersUsers?: FollowersUsersResolver; 
    followingUsers?: FollowingUsersResolver; 
    followingBusiness?: FollowingBusinessResolver; 
    mybusinesses?: MybusinessesResolver; 
    post?: PostResolver; 
    imagePost?: ImagePostResolver; 
    videoPost?: VideoPostResolver; 
    createdAt?: CreatedAtResolver; 
    modifiedAt?: ModifiedAtResolver; 
    rewards?: RewardsResolver; 
    referredBy?: ReferredByResolver; 
  }

  export type IdResolver = Resolver<string>;  export type EmailResolver = Resolver<string | null>;  export type UsernameResolver = Resolver<string | null>;  export type UserPreferencesResolver = Resolver<UserPreferences | null>;  export type StatusResolver = Resolver<UserStatus | null>;  export type AvatarResolver = Resolver<string | null>;  export type NameResolver = Resolver<string | null>;  export type LastLoginResolver = Resolver<string | null>;  export type ChannelsResolver = Resolver<(Channel | null)[] | null>;  export type DirectMessagesResolver = Resolver<(Channel | null)[] | null>;  export type ProfileResolver = Resolver<Profile | null>;  export type PostsCountResolver = Resolver<number | null>;  export type FollowersCountResolver = Resolver<number | null>;  export type FollowingCountResolver = Resolver<number | null>;  export type ReferredUsersResolver = Resolver<(User | null)[] | null>;  export type FollowersUsersResolver = Resolver<UsersWithCursor | null, FollowersUsersArgs>;
  export interface FollowersUsersArgs {
    cursor?: string | null; 
    limit?: number | null; 
  }

  export type FollowingUsersResolver = Resolver<UsersWithCursor | null, FollowingUsersArgs>;
  export interface FollowingUsersArgs {
    cursor?: string | null; 
    limit?: number | null; 
  }

  export type FollowingBusinessResolver = Resolver<(Business | null)[] | null>;  export type MybusinessesResolver = Resolver<(Business | null)[] | null>;  export type PostResolver = Resolver<PostsWithCursor | null, PostArgs>;
  export interface PostArgs {
    prev?: string | null; 
    next?: string | null; 
    limit?: number | null; 
  }

  export type ImagePostResolver = Resolver<PostsWithCursor | null, ImagePostArgs>;
  export interface ImagePostArgs {
    prev?: string | null; 
    next?: string | null; 
    limit?: number | null; 
  }

  export type VideoPostResolver = Resolver<PostsWithCursor | null, VideoPostArgs>;
  export interface VideoPostArgs {
    prev?: string | null; 
    next?: string | null; 
    limit?: number | null; 
  }

  export type CreatedAtResolver = Resolver<string | null>;  export type ModifiedAtResolver = Resolver<string | null>;  export type RewardsResolver = Resolver<Reward | null>;  export type ReferredByResolver = Resolver<string | null>;  
}

export namespace UserPreferencesResolvers {
  export interface Resolvers {
    language?: LanguageResolver; 
    notificationDuration?: NotificationDurationResolver; 
    unreadTrayIconAlert?: UnreadTrayIconAlertResolver; 
    useEmojis?: UseEmojisResolver; 
    convertAsciiToEmoji?: ConvertAsciiToEmojiResolver; 
    autoLoadImages?: AutoLoadImagesResolver; 
    saveMobileBandwith?: SaveMobileBandwithResolver; 
    collapseEmbeddedMeida?: CollapseEmbeddedMeidaResolver; 
    unreadRoomsMode?: UnreadRoomsModeResolver; 
    hideUserName?: HideUserNameResolver; 
    hideRoles?: HideRolesResolver; 
    hideRightSideBarWithClick?: HideRightSideBarWithClickResolver; 
    hideAvatars?: HideAvatarsResolver; 
    mergePrivateGroupsWithChannels?: MergePrivateGroupsWithChannelsResolver; 
    enterKeyBehaviour?: EnterKeyBehaviourResolver; 
    viewMode?: ViewModeResolver; 
    offlineEmailNotifications?: OfflineEmailNotificationsResolver; 
    highlights?: HighlightsResolver; 
    newRoomNotificationSound?: NewRoomNotificationSoundResolver; 
    newMessageNotificationSound?: NewMessageNotificationSoundResolver; 
  }

  export type LanguageResolver = Resolver<string | null>;  export type NotificationDurationResolver = Resolver<number | null>;  export type UnreadTrayIconAlertResolver = Resolver<boolean | null>;  export type UseEmojisResolver = Resolver<boolean | null>;  export type ConvertAsciiToEmojiResolver = Resolver<boolean | null>;  export type AutoLoadImagesResolver = Resolver<boolean | null>;  export type SaveMobileBandwithResolver = Resolver<boolean | null>;  export type CollapseEmbeddedMeidaResolver = Resolver<boolean | null>;  export type UnreadRoomsModeResolver = Resolver<boolean | null>;  export type HideUserNameResolver = Resolver<boolean | null>;  export type HideRolesResolver = Resolver<boolean | null>;  export type HideRightSideBarWithClickResolver = Resolver<boolean | null>;  export type HideAvatarsResolver = Resolver<boolean | null>;  export type MergePrivateGroupsWithChannelsResolver = Resolver<boolean | null>;  export type EnterKeyBehaviourResolver = Resolver<string | null>;  export type ViewModeResolver = Resolver<string | null>;  export type OfflineEmailNotificationsResolver = Resolver<string | null>;  export type HighlightsResolver = Resolver<string | null>;  export type NewRoomNotificationSoundResolver = Resolver<string | null>;  export type NewMessageNotificationSoundResolver = Resolver<string | null>;  
}

export namespace ChannelResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    name?: NameResolver; 
    description?: DescriptionResolver; /** topic: TODOuserNotificationSettings: ChannelSettings */
    announcement?: AnnouncementResolver; 
    numberOfMembers?: NumberOfMembersResolver; 
    members?: MembersResolver; 
    owners?: OwnersResolver; 
    direct?: DirectResolver; 
    privateChannel?: PrivateChannelResolver; 
    readOnly?: ReadOnlyResolver; 
    archived?: ArchivedResolver; 
    favorite?: FavoriteResolver; 
    unseenMessages?: UnseenMessagesResolver; 
  }

  export type IdResolver = Resolver<string | null>;  export type NameResolver = Resolver<string | null>;  export type DescriptionResolver = Resolver<string | null>;  export type AnnouncementResolver = Resolver<string | null>;  export type NumberOfMembersResolver = Resolver<number | null>;  export type MembersResolver = Resolver<(User | null)[] | null>;  export type OwnersResolver = Resolver<(User | null)[] | null>;  export type DirectResolver = Resolver<boolean | null>;  export type PrivateChannelResolver = Resolver<boolean | null>;  export type ReadOnlyResolver = Resolver<boolean | null>;  export type ArchivedResolver = Resolver<boolean | null>;  export type FavoriteResolver = Resolver<boolean | null>;  export type UnseenMessagesResolver = Resolver<number | null>;  
}

export namespace ProfileResolvers {
  export interface Resolvers {
    fbId?: FbIdResolver; 
    googlePlusId?: GooglePlusIdResolver; 
    firstName?: FirstNameResolver; 
    lastName?: LastNameResolver; 
    requesting_device_id?: Requesting_device_idResolver; 
    strategy?: StrategyResolver; 
    avatarId?: AvatarIdResolver; 
    images?: ImagesResolver; 
    userPersonalContact?: UserPersonalContactResolver; 
    personalContact?: PersonalContactResolver; 
    personalInfo?: PersonalInfoResolver; 
    userCustomUrls?: UserCustomUrlsResolver; 
    placesHistory?: PlacesHistoryResolver; 
    workHistory?: WorkHistoryResolver; 
    educationHistory?: EducationHistoryResolver; 
    userStory?: UserStoryResolver; 
    backgroundImage?: BackgroundImageResolver; 
    profileSet?: ProfileSetResolver; 
  }

  export type FbIdResolver = Resolver<string | null>;  export type GooglePlusIdResolver = Resolver<string | null>;  export type FirstNameResolver = Resolver<string | null>;  export type LastNameResolver = Resolver<string | null>;  export type Requesting_device_idResolver = Resolver<string | null>;  export type StrategyResolver = Resolver<string | null>;  export type AvatarIdResolver = Resolver<string | null>;  export type ImagesResolver = Resolver<PhotoUrl | null>;  export type UserPersonalContactResolver = Resolver<PersonalContact | null>;  export type PersonalContactResolver = Resolver<PersonalContact | null>;  export type PersonalInfoResolver = Resolver<PersonalInfo | null>;  export type UserCustomUrlsResolver = Resolver<CustomUrls | null>;  export type PlacesHistoryResolver = Resolver<PlacesHistory | null>;  export type WorkHistoryResolver = Resolver<WorkHistory | null>;  export type EducationHistoryResolver = Resolver<(EducationHistory | null)[] | null>;  export type UserStoryResolver = Resolver<Story | null>;  export type BackgroundImageResolver = Resolver<PhotoUrl | null>;  export type ProfileSetResolver = Resolver<boolean | null>;  
}

export namespace PhotoUrlResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    xlarge?: XlargeResolver; 
    large?: LargeResolver; 
    normal?: NormalResolver; 
    small?: SmallResolver; 
  }

  export type IdResolver = Resolver<string | null>;  export type XlargeResolver = Resolver<string | null>;  export type LargeResolver = Resolver<string | null>;  export type NormalResolver = Resolver<string | null>;  export type SmallResolver = Resolver<string | null>;  
}

export namespace PersonalContactResolvers {
  export interface Resolvers {
    website?: WebsiteResolver; 
    phonenumber?: PhonenumberResolver; 
    address?: AddressResolver; 
    visibility?: VisibilityResolver; 
  }

  export type WebsiteResolver = Resolver<(Email | null)[] | null>;  export type PhonenumberResolver = Resolver<(Phone | null)[] | null>;  export type AddressResolver = Resolver<(Address | null)[] | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace EmailResolvers {
  export interface Resolvers {
    email?: EmailResolver; 
    emailType?: EmailTypeResolver; 
  }

  export type EmailResolver = Resolver<string | null>;  export type EmailTypeResolver = Resolver<string | null>;  
}

export namespace PhoneResolvers {
  export interface Resolvers {
    phoneNumber?: PhoneNumberResolver; 
    phoneType?: PhoneTypeResolver; 
  }

  export type PhoneNumberResolver = Resolver<string | null>;  export type PhoneTypeResolver = Resolver<string | null>;  
}

export namespace AddressResolvers {
  export interface Resolvers {
    address?: AddressResolver; 
  }

  export type AddressResolver = Resolver<string | null>;  
}

export namespace PersonalInfoResolvers {
  export interface Resolvers {
    gender?: GenderResolver; 
    birthday?: BirthdayResolver; 
    occupation?: OccupationResolver; 
    visibility?: VisibilityResolver; 
  }

  export type GenderResolver = Resolver<string | null>;  export type BirthdayResolver = Resolver<string | null>;  export type OccupationResolver = Resolver<string | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace CustomUrlsResolvers {
  export interface Resolvers {
    customUrls?: CustomUrlsResolver; 
    visibility?: VisibilityResolver; 
  }

  export type CustomUrlsResolver = Resolver<(string | null)[] | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace PlacesHistoryResolvers {
  export interface Resolvers {
    placesHistory?: PlacesHistoryResolver; 
    visibility?: VisibilityResolver; 
  }

  export type PlacesHistoryResolver = Resolver<(Places | null)[] | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace PlacesResolvers {
  export interface Resolvers {
    currentPlace?: CurrentPlaceResolver; 
    livedPlaces?: LivedPlacesResolver; 
  }

  export type CurrentPlaceResolver = Resolver<string | null>;  export type LivedPlacesResolver = Resolver<(string | null)[] | null>;  
}

export namespace WorkHistoryResolvers {
  export interface Resolvers {
    workHistory?: WorkHistoryResolver; 
    visibility?: VisibilityResolver; 
  }

  export type WorkHistoryResolver = Resolver<(string | null)[] | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace EducationHistoryResolvers {
  export interface Resolvers {
    schoolName?: SchoolNameResolver; 
    major?: MajorResolver; 
    year?: YearResolver; 
    endyear?: EndyearResolver; 
    description?: DescriptionResolver; 
    educationHistory?: EducationHistoryResolver; 
    visibility?: VisibilityResolver; 
  }

  export type SchoolNameResolver = Resolver<string | null>;  export type MajorResolver = Resolver<string | null>;  export type YearResolver = Resolver<number | null>;  export type EndyearResolver = Resolver<number | null>;  export type DescriptionResolver = Resolver<string | null>;  export type EducationHistoryResolver = Resolver<(EducationHistory | null)[] | null>;  export type VisibilityResolver = Resolver<string | null>;  
}

export namespace StoryResolvers {
  export interface Resolvers {
    story?: StoryResolver; 
    tagline?: TaglineResolver; 
  }

  export type StoryResolver = Resolver<string | null>;  export type TaglineResolver = Resolver<string | null>;  
}

export namespace UsersWithCursorResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; 
    usersArray?: UsersArrayResolver; 
  }

  export type CursorResolver = Resolver<string | null>;  export type UsersArrayResolver = Resolver<(User | null)[] | null>;  
}

export namespace BusinessResolvers {
  export interface Resolvers {
    _id?: _idResolver; 
    user?: UserResolver; 
    referredBy?: ReferredByResolver; 
    bizName?: BizNameResolver; 
    category?: CategoryResolver; 
    zipcode?: ZipcodeResolver; /** subCategory: Subcategory */
    address?: AddressResolver; 
    title?: TitleResolver; 
    website?: WebsiteResolver; 
    geotag?: GeotagResolver; 
    followers?: FollowersResolver; 
    followersCount?: FollowersCountResolver; 
  }

  export type _idResolver = Resolver<string | null>;  export type UserResolver = Resolver<User | null>;  export type ReferredByResolver = Resolver<User | null>;  export type BizNameResolver = Resolver<string | null>;  export type CategoryResolver = Resolver<Category | null>;  export type ZipcodeResolver = Resolver<number | null>;  export type AddressResolver = Resolver<string | null>;  export type TitleResolver = Resolver<string | null>;  export type WebsiteResolver = Resolver<string | null>;  export type GeotagResolver = Resolver<Geotag | null>;  export type FollowersResolver = Resolver<(User | null)[] | null>;  export type FollowersCountResolver = Resolver<number | null>;  
}

export namespace CategoryResolvers {
  export interface Resolvers {
    name?: NameResolver; 
    category?: CategoryResolver; 
  }

  export type NameResolver = Resolver<string>;  export type CategoryResolver = Resolver<string>;  
}

export namespace GeotagResolvers {
  export interface Resolvers {
    type?: TypeResolver; 
    coordinates?: CoordinatesResolver; 
  }

  export type TypeResolver = Resolver<string | null>;  export type CoordinatesResolver = Resolver<Coordinates | null>;  
}

export namespace CoordinatesResolvers {
  export interface Resolvers {
    lat?: LatResolver; 
    long?: LongResolver; 
  }

  export type LatResolver = Resolver<number>;  export type LongResolver = Resolver<number>;  
}

export namespace PostsWithCursorResolvers {
  export interface Resolvers {
    hasNext?: HasNextResolver; /** this will tell you if you have next set of records */
    hasPrevious?: HasPreviousResolver; 
    next?: NextResolver; 
    previous?: PreviousResolver; 
    posts?: PostsResolver; 
  }

  export type HasNextResolver = Resolver<boolean>;  export type HasPreviousResolver = Resolver<boolean>;  export type NextResolver = Resolver<string | null>;  export type PreviousResolver = Resolver<string | null>;  export type PostsResolver = Resolver<(Post | null)[] | null>;  
}

export namespace PostResolvers {
  export interface Resolvers {
    _id?: _idResolver; 
    title?: TitleResolver; 
    content?: ContentResolver; 
    mentions?: MentionsResolver; 
    BizId?: BizIdResolver; 
    geotag?: GeotagResolver; 
    photos?: PhotosResolver; 
    withFriends?: WithFriendsResolver; 
    postType?: PostTypeResolver; 
    visibility?: VisibilityResolver; 
    user?: UserResolver; 
    shares?: SharesResolver; 
    likes?: LikesResolver; 
    bookmarks?: BookmarksResolver; 
    fileUrl?: FileUrlResolver; 
    commentsCount?: CommentsCountResolver; 
    create_date?: Create_dateResolver; /** comments(prev: String, next: String, limit: Int): CommentsWithCursor */
    modified_date?: Modified_dateResolver; 
  }

  export type _idResolver = Resolver<string>;  export type TitleResolver = Resolver<string | null>;  export type ContentResolver = Resolver<string | null>;  export type MentionsResolver = Resolver<(string | null)[] | null>;  export type BizIdResolver = Resolver<string | null>;  export type GeotagResolver = Resolver<GeoTag | null>;  export type PhotosResolver = Resolver<(PhotoUrl | null)[] | null>;  export type WithFriendsResolver = Resolver<(User | null)[] | null>;  export type PostTypeResolver = Resolver<string | null>;  export type VisibilityResolver = Resolver<PostVisibility | null>;  export type UserResolver = Resolver<User | null>;  export type SharesResolver = Resolver<(string | null)[] | null>;  export type LikesResolver = Resolver<(LikeByPost | null)[] | null>;  export type BookmarksResolver = Resolver<(BookMarkPost | null)[] | null>;  export type FileUrlResolver = Resolver<(PhotoUrl | null)[] | null>;  export type CommentsCountResolver = Resolver<number | null>;  export type Create_dateResolver = Resolver<string | null>;  export type Modified_dateResolver = Resolver<string | null>;  
}

export namespace GeoTagResolvers {
  export interface Resolvers {
    type?: TypeResolver; 
    coordinates?: CoordinatesResolver; 
    title?: TitleResolver; 
    placeId?: PlaceIdResolver; 
  }

  export type TypeResolver = Resolver<string | null>;  export type CoordinatesResolver = Resolver<Coordinates | null>;  export type TitleResolver = Resolver<string | null>;  export type PlaceIdResolver = Resolver<string | null>;  
}

export namespace LikeByPostResolvers {
  export interface Resolvers {
    user?: UserResolver; 
    like?: LikeResolver; 
  }

  export type UserResolver = Resolver<User | null>;  export type LikeResolver = Resolver<string | null>;  
}

export namespace BookMarkPostResolvers {
  export interface Resolvers {
    user?: UserResolver; 
    bookMark?: BookMarkResolver; 
  }

  export type UserResolver = Resolver<User | null>;  export type BookMarkResolver = Resolver<Bookmark | null>;  
}

export namespace RewardResolvers {
  export interface Resolvers {
    pointsInCash?: PointsInCashResolver; 
    currentPoints?: CurrentPointsResolver; 
  }

  export type PointsInCashResolver = Resolver<number | null>;  export type CurrentPointsResolver = Resolver<number | null>;  
}

export namespace BusinessWithCursorResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; 
    businessArray?: BusinessArrayResolver; 
  }

  export type CursorResolver = Resolver<string | null>;  export type BusinessArrayResolver = Resolver<(Business | null)[] | null>;  
}

export namespace MessagesWithCursorResolvers {
  export interface Resolvers {
    cursor?: CursorResolver; 
    channel?: ChannelResolver; 
    messagesArray?: MessagesArrayResolver; 
  }

  export type CursorResolver = Resolver<string | null>;  export type ChannelResolver = Resolver<Channel | null>;  export type MessagesArrayResolver = Resolver<(Message | null)[] | null>;  
}

export namespace MessageResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    author?: AuthorResolver; 
    content?: ContentResolver; 
    creationTime?: CreationTimeResolver; 
    channel?: ChannelResolver; 
    fromServer?: FromServerResolver; 
    tags?: TagsResolver; 
    userRef?: UserRefResolver; 
    channelRef?: ChannelRefResolver; 
    reactions?: ReactionsResolver; 
  }

  export type IdResolver = Resolver<string | null>;  export type AuthorResolver = Resolver<User | null>;  export type ContentResolver = Resolver<string | null>;  export type CreationTimeResolver = Resolver<string | null>;  export type ChannelResolver = Resolver<Channel | null>;  export type FromServerResolver = Resolver<boolean | null>;  export type TagsResolver = Resolver<(string | null)[] | null>;  export type UserRefResolver = Resolver<(User | null)[] | null>;  export type ChannelRefResolver = Resolver<(Channel | null)[] | null>;  export type ReactionsResolver = Resolver<(Reaction | null)[] | null>;  
}

export namespace ReactionResolvers {
  export interface Resolvers {
    username?: UsernameResolver; 
    icon?: IconResolver; 
  }

  export type UsernameResolver = Resolver<string | null>;  export type IconResolver = Resolver<string | null>;  
}

export namespace CommentsWithCursorResolvers {
  export interface Resolvers {
    hasNext?: HasNextResolver; 
    hasPrevious?: HasPreviousResolver; 
    next?: NextResolver; 
    previous?: PreviousResolver; 
    results?: ResultsResolver; 
  }

  export type HasNextResolver = Resolver<boolean>;  export type HasPreviousResolver = Resolver<boolean>;  export type NextResolver = Resolver<string | null>;  export type PreviousResolver = Resolver<string | null>;  export type ResultsResolver = Resolver<(Comment | null)[] | null>;  
}

export namespace CommentResolvers {
  export interface Resolvers {
    _id?: _idResolver; 
    user?: UserResolver; 
    content?: ContentResolver; 
    creationTime?: CreationTimeResolver; 
    fromServer?: FromServerResolver; 
    tags?: TagsResolver; 
    reactions?: ReactionsResolver; 
  }

  export type _idResolver = Resolver<string>;  export type UserResolver = Resolver<User | null>;  export type ContentResolver = Resolver<string | null>;  export type CreationTimeResolver = Resolver<string | null>;  export type FromServerResolver = Resolver<boolean | null>;  export type TagsResolver = Resolver<(string | null)[] | null>;  export type ReactionsResolver = Resolver<(Reaction | null)[] | null>;  
}

export namespace PlaceResolvers {
  export interface Resolvers {
    id?: IdResolver; 
    title?: TitleResolver; 
    distance?: DistanceResolver; 
    geotag?: GeotagResolver; 
  }

  export type IdResolver = Resolver<string>;  export type TitleResolver = Resolver<string>;  export type DistanceResolver = Resolver<number>;  export type GeotagResolver = Resolver<Geotag | null>;  
}

export namespace RewardsDetailResolvers {
  export interface Resolvers {
    month?: MonthResolver; 
    year?: YearResolver; 
    points?: PointsResolver; 
    cashPoints?: CashPointsResolver; 
  }

  export type MonthResolver = Resolver<number | null>;  export type YearResolver = Resolver<number | null>;  export type PointsResolver = Resolver<number | null>;  export type CashPointsResolver = Resolver<number | null>;  
}

export namespace SearchResultResolvers {
  export interface Resolvers {
    data?: DataResolver; 
  }

  export type DataResolver = Resolver<string>;  
}

export namespace MutationResolvers {
  export interface Resolvers {
    serviceAuthenticate?: ServiceAuthenticateResolver; 
    refreshTokens?: RefreshTokensResolver; 
    logout?: LogoutResolver; 
    impersonate?: ImpersonateResolver; 
    registerPassword?: RegisterPasswordResolver; 
    verifyEmail?: VerifyEmailResolver; 
    resetPassword?: ResetPasswordResolver; 
    sendVerificationEmail?: SendVerificationEmailResolver; 
    sendResetPasswordEmail?: SendResetPasswordEmailResolver; 
    twoFactorSecret?: TwoFactorSecretResolver; 
    createPromoPost?: CreatePromoPostResolver; 
    editPromoPost?: EditPromoPostResolver; 
    deletePromoPost?: DeletePromoPostResolver; 
    referBiz?: ReferBizResolver; 
    addBiz?: AddBizResolver; 
    editBiz?: EditBizResolver; 
    deleteBiz?: DeleteBizResolver; 
    followBiz?: FollowBizResolver; 
    unfollowBiz?: UnfollowBizResolver; 
    leaveChannel?: LeaveChannelResolver; 
    hideChannel?: HideChannelResolver; 
    setStatus?: SetStatusResolver; 
    createChannel?: CreateChannelResolver; 
    sendMessage?: SendMessageResolver; 
    deleteMessage?: DeleteMessageResolver; 
    editMessage?: EditMessageResolver; 
    addReactionToMassage?: AddReactionToMassageResolver; 
    updateUserSettings?: UpdateUserSettingsResolver; 
    loginWithServiceAccessToken?: LoginWithServiceAccessTokenResolver; 
    addComment?: AddCommentResolver; 
    deleteComment?: DeleteCommentResolver; 
    editComment?: EditCommentResolver; 
    addReactionToComment?: AddReactionToCommentResolver; 
    removeReactionToComment?: RemoveReactionToCommentResolver; 
    registerDevice?: RegisterDeviceResolver; 
    unregisterDevice?: UnregisterDeviceResolver; 
    forgotPassword?: ForgotPasswordResolver; 
    createPost?: CreatePostResolver; 
    editPost?: EditPostResolver; 
    deletePost?: DeletePostResolver; 
    uploadPhoto?: UploadPhotoResolver; 
    deletePhoto?: DeletePhotoResolver; 
    deletePhotoFromPost?: DeletePhotoFromPostResolver; 
    favorPost?: FavorPostResolver; 
    unFavorPost?: UnFavorPostResolver; 
    bookMarkPost?: BookMarkPostResolver; 
    unbookMarkPost?: UnbookMarkPostResolver; 
    sharePost?: SharePostResolver; 
    unsharePost?: UnsharePostResolver; 
    follow?: FollowResolver; 
    unfollow?: UnfollowResolver; 
    uploadProfilePhoto?: UploadProfilePhotoResolver; 
    uploadProfileBackgroundPhoto?: UploadProfileBackgroundPhotoResolver; 
    deleteProfilePhoto?: DeleteProfilePhotoResolver; 
    deleteBackgroundPhoto?: DeleteBackgroundPhotoResolver; 
    approveFollower?: ApproveFollowerResolver; 
    rejectFollower?: RejectFollowerResolver; 
    updatePersonalInfo?: UpdatePersonalInfoResolver; 
    updatePersonalContact?: UpdatePersonalContactResolver; 
    updateUserCustomUrl?: UpdateUserCustomUrlResolver; 
    updateUserPlacesHistory?: UpdateUserPlacesHistoryResolver; 
    updateEducationHistory?: UpdateEducationHistoryResolver; 
    updateWorkHistory?: UpdateWorkHistoryResolver; 
    updateUserStory?: UpdateUserStoryResolver; 
    deactiveAccount?: DeactiveAccountResolver; 
    referFriends?: ReferFriendsResolver; 
  }

  export type ServiceAuthenticateResolver = Resolver<LoginReturn | null, ServiceAuthenticateArgs>;
  export interface ServiceAuthenticateArgs {
    serviceName: string; 
    userFields: PasswordLoginType; 
  }

  export type RefreshTokensResolver = Resolver<LoginReturn | null, RefreshTokensArgs>;
  export interface RefreshTokensArgs {
    accessToken: string; 
    refreshToken: string; 
  }

  export type LogoutResolver = Resolver<boolean | null, LogoutArgs>;
  export interface LogoutArgs {
    accessToken: string; 
  }

  export type ImpersonateResolver = Resolver<ImpersonateReturn | null, ImpersonateArgs>;
  export interface ImpersonateArgs {
    accessToken: string; 
    username: string; 
  }

  export type RegisterPasswordResolver = Resolver<boolean | null, RegisterPasswordArgs>;
  export interface RegisterPasswordArgs {
    serviceName: string; 
    user: CreateUserInput; 
  }

  export type VerifyEmailResolver = Resolver<boolean | null, VerifyEmailArgs>;
  export interface VerifyEmailArgs {
    token: string; 
  }

  export type ResetPasswordResolver = Resolver<boolean | null, ResetPasswordArgs>;
  export interface ResetPasswordArgs {
    token: string; 
    newPassword: string; 
  }

  export type SendVerificationEmailResolver = Resolver<boolean | null, SendVerificationEmailArgs>;
  export interface SendVerificationEmailArgs {
    email: string; 
  }

  export type SendResetPasswordEmailResolver = Resolver<boolean | null, SendResetPasswordEmailArgs>;
  export interface SendResetPasswordEmailArgs {
    email: string; 
  }

  export type TwoFactorSecretResolver = Resolver<GeneratedSecret | null>;  export type CreatePromoPostResolver = Resolver<GenericResponse, CreatePromoPostArgs>;
  export interface CreatePromoPostArgs {
    post?: PromoPostInput | null; 
    file?: File | null; 
  }

  export type EditPromoPostResolver = Resolver<GenericResponse, EditPromoPostArgs>;
  export interface EditPromoPostArgs {
    post?: PromoPostInput | null; 
  }

  export type DeletePromoPostResolver = Resolver<GenericResponse, DeletePromoPostArgs>;
  export interface DeletePromoPostArgs {
    postId?: string | null; 
  }

  export type ReferBizResolver = Resolver<GenericResponse, ReferBizArgs>;
  export interface ReferBizArgs {
    userId?: string | null; 
    bizId?: string | null; 
  }

  export type AddBizResolver = Resolver<BizResponse, AddBizArgs>;
  export interface AddBizArgs {
    biz?: NewBizInput | null; 
  }

  export type EditBizResolver = Resolver<BizResponse, EditBizArgs>;
  export interface EditBizArgs {
    biz?: EditBizInput | null; 
  }

  export type DeleteBizResolver = Resolver<GenericResponse, DeleteBizArgs>;
  export interface DeleteBizArgs {
    bizId?: string | null; 
  }

  export type FollowBizResolver = Resolver<GenericResponse, FollowBizArgs>;
  export interface FollowBizArgs {
    bizId: string; 
  }

  export type UnfollowBizResolver = Resolver<GenericResponse, UnfollowBizArgs>;
  export interface UnfollowBizArgs {
    bizId: string; 
  }

  export type LeaveChannelResolver = Resolver<boolean | null, LeaveChannelArgs>;
  export interface LeaveChannelArgs {
    channelId: string; 
  }

  export type HideChannelResolver = Resolver<boolean | null, HideChannelArgs>;
  export interface HideChannelArgs {
    channelId: string; 
  }

  export type SetStatusResolver = Resolver<User | null, SetStatusArgs>;
  export interface SetStatusArgs {
    status: UserStatus; 
  }

  export type CreateChannelResolver = Resolver<Channel | null, CreateChannelArgs>;
  export interface CreateChannelArgs {
    name: string; 
    private?: boolean | null; 
    readOnly?: boolean | null; 
    membersId?: string[] | null; 
  }

  export type SendMessageResolver = Resolver<Message | null, SendMessageArgs>;
  export interface SendMessageArgs {
    channelId: string; 
    content: string; 
  }

  export type DeleteMessageResolver = Resolver<boolean | null, DeleteMessageArgs>;
  export interface DeleteMessageArgs {
    messageId: MessageIdentifier; 
  }

  export type EditMessageResolver = Resolver<Message | null, EditMessageArgs>;
  export interface EditMessageArgs {
    messageId: MessageIdentifier; 
    content: string; 
  }

  export type AddReactionToMassageResolver = Resolver<Message | null, AddReactionToMassageArgs>;
  export interface AddReactionToMassageArgs {
    messageId: MessageIdentifier; 
    icon: string; 
  }

  export type UpdateUserSettingsResolver = Resolver<User | null, UpdateUserSettingsArgs>;
  export interface UpdateUserSettingsArgs {
    userSettings?: UserSettings | null; 
  }

  export type LoginWithServiceAccessTokenResolver = Resolver<LoginResult | null, LoginWithServiceAccessTokenArgs>;
  export interface LoginWithServiceAccessTokenArgs {
    service: string; 
    accessToken: string; 
  }

  export type AddCommentResolver = Resolver<GenericResponse, AddCommentArgs>;
  export interface AddCommentArgs {
    comment: CommentInput; 
  }

  export type DeleteCommentResolver = Resolver<GenericResponse, DeleteCommentArgs>;
  export interface DeleteCommentArgs {
    commentId: string; 
  }

  export type EditCommentResolver = Resolver<GenericResponse, EditCommentArgs>;
  export interface EditCommentArgs {
    commentId: string; 
    comment: CommentInput; 
  }

  export type AddReactionToCommentResolver = Resolver<GenericResponse, AddReactionToCommentArgs>;
  export interface AddReactionToCommentArgs {
    commentId: string; 
  }

  export type RemoveReactionToCommentResolver = Resolver<GenericResponse, RemoveReactionToCommentArgs>;
  export interface RemoveReactionToCommentArgs {
    commentId: string; 
  }

  export type RegisterDeviceResolver = Resolver<GenericResponse | null, RegisterDeviceArgs>;
  export interface RegisterDeviceArgs {
    deviceInput?: Device | null; 
  }

  export type UnregisterDeviceResolver = Resolver<GenericResponse | null, UnregisterDeviceArgs>;
  export interface UnregisterDeviceArgs {
    deviceInput?: Device | null; 
  }

  export type ForgotPasswordResolver = Resolver<GenericResponse>;  export type CreatePostResolver = Resolver<NewPostResponse, CreatePostArgs>;
  export interface CreatePostArgs {
    post?: PostInput | null; 
  }

  export type EditPostResolver = Resolver<GenericResponse, EditPostArgs>;
  export interface EditPostArgs {
    post?: PostUpdateInput | null; 
  }

  export type DeletePostResolver = Resolver<GenericResponse, DeletePostArgs>;
  export interface DeletePostArgs {
    postId: string; 
  }

  export type UploadPhotoResolver = Resolver<string, UploadPhotoArgs>;
  export interface UploadPhotoArgs {
    file: File; 
  }

  export type DeletePhotoResolver = Resolver<GenericResponse, DeletePhotoArgs>;
  export interface DeletePhotoArgs {
    id: string; 
  }

  export type DeletePhotoFromPostResolver = Resolver<GenericResponse, DeletePhotoFromPostArgs>;
  export interface DeletePhotoFromPostArgs {
    id: string; 
    postId: string; 
  }

  export type FavorPostResolver = Resolver<GenericResponse, FavorPostArgs>;
  export interface FavorPostArgs {
    postId: string; 
    like: PostlikeTypes; 
  }

  export type UnFavorPostResolver = Resolver<GenericResponse, UnFavorPostArgs>;
  export interface UnFavorPostArgs {
    postId: string; 
    like: PostlikeTypes; 
  }

  export type BookMarkPostResolver = Resolver<GenericResponse, BookMarkPostArgs>;
  export interface BookMarkPostArgs {
    postId: string; 
    bookMark?: Bookmark | null; 
  }

  export type UnbookMarkPostResolver = Resolver<GenericResponse, UnbookMarkPostArgs>;
  export interface UnbookMarkPostArgs {
    postId: string; 
    bookMark?: Bookmark | null; 
  }

  export type SharePostResolver = Resolver<GenericResponse, SharePostArgs>;
  export interface SharePostArgs {
    postId: string; 
    comment?: string | null; 
  }

  export type UnsharePostResolver = Resolver<GenericResponse, UnsharePostArgs>;
  export interface UnsharePostArgs {
    postId: string; 
  }

  export type FollowResolver = Resolver<GenericResponse, FollowArgs>;
  export interface FollowArgs {
    followingId: string; 
  }

  export type UnfollowResolver = Resolver<GenericResponse, UnfollowArgs>;
  export interface UnfollowArgs {
    followerId: string; 
  }

  export type UploadProfilePhotoResolver = Resolver<PhotoUrl, UploadProfilePhotoArgs>;
  export interface UploadProfilePhotoArgs {
    file: File; 
  }

  export type UploadProfileBackgroundPhotoResolver = Resolver<PhotoUrl, UploadProfileBackgroundPhotoArgs>;
  export interface UploadProfileBackgroundPhotoArgs {
    file: File; 
  }

  export type DeleteProfilePhotoResolver = Resolver<GenericResponse>;  export type DeleteBackgroundPhotoResolver = Resolver<GenericResponse>;  export type ApproveFollowerResolver = Resolver<GenericResponse, ApproveFollowerArgs>;
  export interface ApproveFollowerArgs {
    followerId?: string | null; 
  }

  export type RejectFollowerResolver = Resolver<GenericResponse, RejectFollowerArgs>;
  export interface RejectFollowerArgs {
    followerId?: string | null; 
  }

  export type UpdatePersonalInfoResolver = Resolver<GenericResponse, UpdatePersonalInfoArgs>;
  export interface UpdatePersonalInfoArgs {
    personalInfo: PersonalInfoInput; 
  }

  export type UpdatePersonalContactResolver = Resolver<GenericResponse, UpdatePersonalContactArgs>;
  export interface UpdatePersonalContactArgs {
    personalContact: PersonalContactInput; 
  }

  export type UpdateUserCustomUrlResolver = Resolver<GenericResponse, UpdateUserCustomUrlArgs>;
  export interface UpdateUserCustomUrlArgs {
    customUrls: (CustomUrlsInput | null)[]; 
  }

  export type UpdateUserPlacesHistoryResolver = Resolver<GenericResponse, UpdateUserPlacesHistoryArgs>;
  export interface UpdateUserPlacesHistoryArgs {
    placesHistory: PlacesHistoryInput; 
  }

  export type UpdateEducationHistoryResolver = Resolver<GenericResponse, UpdateEducationHistoryArgs>;
  export interface UpdateEducationHistoryArgs {
    educationHistory: Education; 
  }

  export type UpdateWorkHistoryResolver = Resolver<GenericResponse, UpdateWorkHistoryArgs>;
  export interface UpdateWorkHistoryArgs {
    workHistory: WorkHistoryInput; 
  }

  export type UpdateUserStoryResolver = Resolver<GenericResponse, UpdateUserStoryArgs>;
  export interface UpdateUserStoryArgs {
    userStory: StoryInput; 
  }

  export type DeactiveAccountResolver = Resolver<GenericResponse>;  export type ReferFriendsResolver = Resolver<GenericResponse, ReferFriendsArgs>;
  export interface ReferFriendsArgs {
    emailIds?: (string | null)[] | null; 
  }

  
}

export namespace LoginReturnResolvers {
  export interface Resolvers {
    sessionId?: SessionIdResolver; 
    user?: UserResolver; 
    tokens?: TokensResolver; 
  }

  export type SessionIdResolver = Resolver<string | null>;  export type UserResolver = Resolver<User | null>;  export type TokensResolver = Resolver<Tokens | null>;  
}

export namespace TokensResolvers {
  export interface Resolvers {
    refreshToken?: RefreshTokenResolver; 
    accessToken?: AccessTokenResolver; 
  }

  export type RefreshTokenResolver = Resolver<string | null>;  export type AccessTokenResolver = Resolver<string | null>;  
}

export namespace ImpersonateReturnResolvers {
  export interface Resolvers {
    authorized?: AuthorizedResolver; 
    tokens?: TokensResolver; 
    user?: UserResolver; 
  }

  export type AuthorizedResolver = Resolver<boolean | null>;  export type TokensResolver = Resolver<Tokens | null>;  export type UserResolver = Resolver<User | null>;  
}

export namespace GeneratedSecretResolvers {
  export interface Resolvers {
    ascii?: AsciiResolver; 
    hex?: HexResolver; 
    base32?: Base32Resolver; 
    qr_code_ascii?: Qr_code_asciiResolver; 
    qr_code_hex?: Qr_code_hexResolver; 
    qr_code_base32?: Qr_code_base32Resolver; 
    google_auth_qr?: Google_auth_qrResolver; 
    otpauth_url?: Otpauth_urlResolver; 
  }

  export type AsciiResolver = Resolver<string | null>;  export type HexResolver = Resolver<string | null>;  export type Base32Resolver = Resolver<string | null>;  export type Qr_code_asciiResolver = Resolver<string | null>;  export type Qr_code_hexResolver = Resolver<string | null>;  export type Qr_code_base32Resolver = Resolver<string | null>;  export type Google_auth_qrResolver = Resolver<string | null>;  export type Otpauth_urlResolver = Resolver<string | null>;  
}

export namespace GenericResponseResolvers {
  export interface Resolvers {
    ok?: OkResolver; 
    errors?: ErrorsResolver; 
  }

  export type OkResolver = Resolver<boolean>;  export type ErrorsResolver = Resolver<(Error | null)[] | null>;  
}

export namespace ErrorResolvers {
  export interface Resolvers {
    path?: PathResolver; 
    message?: MessageResolver; 
  }

  export type PathResolver = Resolver<string>;  export type MessageResolver = Resolver<string | null>;  
}

export namespace BizResponseResolvers {
  export interface Resolvers {
    ok?: OkResolver; 
    business?: BusinessResolver; 
    errors?: ErrorsResolver; 
  }

  export type OkResolver = Resolver<boolean>;  export type BusinessResolver = Resolver<Business | null>;  export type ErrorsResolver = Resolver<(Error | null)[] | null>;  
}

export namespace LoginResultResolvers {
  export interface Resolvers {
    accessToken?: AccessTokenResolver; 
    refreshToken?: RefreshTokenResolver; 
  }

  export type AccessTokenResolver = Resolver<string | null>;  export type RefreshTokenResolver = Resolver<string | null>;  
}

export namespace NewPostResponseResolvers {
  export interface Resolvers {
    ok?: OkResolver; 
    post?: PostResolver; 
    errors?: ErrorsResolver; 
  }

  export type OkResolver = Resolver<boolean>;  export type PostResolver = Resolver<Post | null>;  export type ErrorsResolver = Resolver<(Error | null)[] | null>;  
}

export namespace SubscriptionResolvers {
  export interface Resolvers {
    chatMessageAdded?: ChatMessageAddedResolver; 
    newComment?: NewCommentResolver; 
    newReaction?: NewReactionResolver; 
    postEvent?: PostEventResolver; 
    rewardEvent?: RewardEventResolver; 
    userEvent?: UserEventResolver; 
  }

  export type ChatMessageAddedResolver = Resolver<Message | null, ChatMessageAddedArgs>;
  export interface ChatMessageAddedArgs {
    channelId: string; 
  }

  export type NewCommentResolver = Resolver<Comment | null, NewCommentArgs>;
  export interface NewCommentArgs {
    postId: string; 
  }

  export type NewReactionResolver = Resolver<Comment | null, NewReactionArgs>;
  export interface NewReactionArgs {
    commentId: string; 
    icon: string; 
  }

  export type PostEventResolver = Resolver<PostEvent | null>;  export type RewardEventResolver = Resolver<UserEvent | null>;  export type UserEventResolver = Resolver<UserEvent | null>;  
}

export namespace PostEventResolvers {
  export interface Resolvers {
    event?: EventResolver; 
    post?: PostResolver; 
  }

  export type EventResolver = Resolver<Events | null>;  export type PostResolver = Resolver<Post | null>;  
}

export namespace UserEventResolvers {
  export interface Resolvers {
    event?: EventResolver; 
    user?: UserResolver; 
    notification?: NotificationResolver; 
  }

  export type EventResolver = Resolver<Events | null>;  export type UserResolver = Resolver<User | null>;  export type NotificationResolver = Resolver<Notification | null>;  
}

export namespace NotificationResolvers {
  export interface Resolvers {
    title?: TitleResolver; 
    body?: BodyResolver; 
    dir?: DirResolver; 
    tag?: TagResolver; 
    renotify?: RenotifyResolver; 
    vibrate?: VibrateResolver; 
  }

  export type TitleResolver = Resolver<string>;  export type BodyResolver = Resolver<string>;  export type DirResolver = Resolver<string | null>;  export type TagResolver = Resolver<string | null>;  export type RenotifyResolver = Resolver<boolean | null>;  export type VibrateResolver = Resolver<(number | null)[] | null>;  
}

export namespace AccountsErrorResolvers {
  export interface Resolvers {
    message?: MessageResolver; 
    loginInfo?: LoginInfoResolver; 
    errorCode?: ErrorCodeResolver; 
  }

  export type MessageResolver = Resolver<string>;  export type LoginInfoResolver = Resolver<string | null>;  export type ErrorCodeResolver = Resolver<number>;  
}

export namespace SubCategoryResolvers {
  export interface Resolvers {
    name?: NameResolver; 
  }

  export type NameResolver = Resolver<string>;  
}

export namespace ChannelSettingsResolvers {
  export interface Resolvers {
    disableNotification?: DisableNotificationResolver; 
    audio?: AudioResolver; 
    desktop?: DesktopResolver; 
    duration?: DurationResolver; 
    mobile?: MobileResolver; 
    mail?: MailResolver; 
    hideUnreadRoomStatus?: HideUnreadRoomStatusResolver; 
    unreadTrayIconAlert?: UnreadTrayIconAlertResolver; 
  }

  export type DisableNotificationResolver = Resolver<boolean | null>;  export type AudioResolver = Resolver<string | null>;  export type DesktopResolver = Resolver<string | null>;  export type DurationResolver = Resolver<number | null>;  export type MobileResolver = Resolver<string | null>;  export type MailResolver = Resolver<string | null>;  export type HideUnreadRoomStatusResolver = Resolver<boolean | null>;  export type UnreadTrayIconAlertResolver = Resolver<string | null>;  
}

export namespace RewardHistoryResolvers {
  export interface Resolvers {
    pointsInCash?: PointsInCashResolver; 
    availablePoints?: AvailablePointsResolver; 
    redeemedPoints?: RedeemedPointsResolver; 
    otherPoints?: OtherPointsResolver; 
  }

  export type PointsInCashResolver = Resolver<number | null>;  export type AvailablePointsResolver = Resolver<number | null>;  export type RedeemedPointsResolver = Resolver<number | null>;  export type OtherPointsResolver = Resolver<number | null>;  
}

export namespace UserGroupResolvers {
  export interface Resolvers {
    _id?: _idResolver; 
    icon?: IconResolver; 
    name?: NameResolver; 
  }

  export type _idResolver = Resolver<string | null>;  export type IconResolver = Resolver<string | null>;  export type NameResolver = Resolver<string | null>;  
}

export interface BusinessNearbyInput {
  maxDistance: number; 
  limit: number; 
  bizName?: string | null; 
  coordinates: CoordinatesInput; 
}

export interface CoordinatesInput {
  long: number; 
  lat: number; 
}

export interface ChannelNameAndDirect {
  name: string; 
  direct: boolean; 
}

export interface ChannelFilter {
  nameFilter?: string | null; 
  privacy?: Privacy | null; 
  joinedChannels?: boolean | null; 
  sortBy?: ChannelSort | null; 
}

export interface GetNearByInput {
  name?: string | null; 
  lat?: number | null; 
  long?: number | null; 
  maxDistance?: number | null; 
  limit: number; 
}

export interface PasswordLoginType {
  user?: LoginUserIdentityType | null; 
  password?: string | null; 
  code?: string | null; 
}

export interface LoginUserIdentityType {
  id?: string | null; 
  username?: string | null; 
  email?: string | null; 
}

export interface CreateUserInput {
  username?: string | null; 
  email?: string | null; 
  password?: string | null; 
  profile?: CreateUserProfileInput | null; 
}

export interface CreateUserProfileInput {
  name?: string | null; 
  firstName?: string | null; 
  lastName?: string | null; 
  personalInfo?: PersonalInfoInput | null; 
  zipcode?: string | null; 
  story?: StoryInput | null; 
}

export interface PersonalInfoInput {
  gender?: string | null; 
  birthday?: string | null; 
  occupation?: string | null; 
  visibility?: string | null; 
}

export interface StoryInput {
  story?: string | null; 
  tagline?: string | null; 
}

export interface PromoPostInput {
  title?: string | null; 
  content?: string | null; 
  geotag?: GeotagInput | null; 
  startDate?: string | null; 
  endDate?: string | null; 
  startTime?: string | null; 
  endTime?: string | null; 
  bizId?: string | null; 
}

export interface GeotagInput {
  type?: string | null; 
  coordinates?: CoordinatesInput | null; 
  title?: string | null; 
  placeId?: string | null; 
}

export interface File {
  id: string; 
  path: string; 
  filename: string; 
  mimetype: string; 
  encoding: string; 
}

export interface NewBizInput {
  referredBy: string; 
  categoryId: string; 
  subcategoryId: string; 
  zipcode?: number | null; 
  address: string; 
  title?: string | null; 
  website?: string | null; 
  geotag: GeotagInput; 
}

export interface EditBizInput {
  categoryId?: string | null; 
  subcategoryId?: string | null; 
  zipcode?: number | null; 
  address?: string | null; 
  title?: string | null; 
  website?: string | null; 
  geotag?: GeotagInput | null; 
  bizId?: string | null; 
}

export interface MessageIdentifier {
  channelId: string; 
  messageId: string; 
}

export interface UserSettings {
  language?: string | null; 
  notificationDuration?: number | null; 
  unreadTrayIconAlert?: boolean | null; 
  useEmojis?: boolean | null; 
  convertAsciiToEmoji?: boolean | null; 
  autoLoadImages?: boolean | null; 
  saveMobileBandwith?: boolean | null; 
  collapseEmbeddedMedia?: boolean | null; 
  unreadRoomsMode?: boolean | null; 
  hideUserName?: boolean | null; 
  hideRoles?: boolean | null; 
  hideRightSideBarWithClick?: boolean | null; 
  hideAvatars?: boolean | null; 
  mergePrivateGroupsWithChannels?: boolean | null; 
  enterKeyBehaviour?: string | null; 
  viewMode?: string | null; 
  offlineEmailNotifications?: string | null; 
  highlights?: string | null; 
  newRoomNotificationSound?: string | null; 
  newMessageNotificationSound?: string | null; 
  email?: string | null; 
  avatar?: string | null; 
  name?: string | null; 
}

export interface CommentInput {
  postId: string; 
  content?: string | null; 
  fileIds?: (string | null)[] | null; 
}

export interface Device {
  endpoint: string; 
  expirationTime?: string | null; 
  keys?: DeviceKeyInput | null; 
}

export interface DeviceKeyInput {
  auth: string; 
  p256dh: string; 
}

export interface PostInput {
  title?: string | null; 
  BizId?: string | null; 
  content?: string | null; 
  geotag?: GeotagInput | null; 
  withFriends?: (string | null)[] | null; 
  fileIds?: (string | null)[] | null; 
  visibility: PostVisibility; 
}

export interface PostUpdateInput {
  _id: string; 
  title?: string | null; 
  content?: string | null; 
  BizId?: string | null; 
  geotag?: GeotagInput | null; 
  withFriends?: (string | null)[] | null; 
  shares?: (string | null)[] | null; 
  fileIds?: (string | null)[] | null; 
  visibility: PostVisibility; 
}

export interface PersonalContactInput {
  website?: (EmailInput | null)[] | null; 
  phonenumber?: (PhoneInput | null)[] | null; 
  address?: (AddressInput | null)[] | null; 
  visibility?: string | null; 
}

export interface EmailInput {
  email?: string | null; 
  emailType?: string | null; 
}

export interface PhoneInput {
  phoneNumber?: string | null; 
  phoneType?: string | null; 
}

export interface AddressInput {
  address?: string | null; 
}

export interface CustomUrlsInput {
  customUrls?: (string | null)[] | null; 
  visibility?: string | null; 
}

export interface PlacesHistoryInput {
  placesHistory?: (PlacesInput | null)[] | null; 
  visibility?: string | null; 
}

export interface PlacesInput {
  currentPlace?: string | null; 
  livedPlaces?: (string | null)[] | null; 
}

export interface Education {
  educationHistory?: (EducationHistoryInput | null)[] | null; 
  visibility?: string | null; 
}

export interface EducationHistoryInput {
  schoolName?: string | null; 
  major?: string | null; 
  year?: number | null; 
  endyear?: number | null; 
  description?: string | null; 
}

export interface WorkHistoryInput {
  workHistory?: (string | null)[] | null; 
  visibility?: string | null; 
}
export interface GetBizNearbyQueryArgs {
  nearBiz?: BusinessNearbyInput | null; 
}
export interface GetPromoBizNearbyQueryArgs {
  nearBiz?: BusinessNearbyInput | null; 
}
export interface GetBusinessQueryArgs {
  bizId: string; 
}
export interface GetBusinessByNameQueryArgs {
  name: string; 
}
export interface MessagesQueryArgs {
  channelId?: string | null; 
  channelDetails?: ChannelNameAndDirect | null; 
  channelName?: string | null; 
  cursor?: string | null; 
  count?: number | null; 
  searchRegex?: string | null; 
}
export interface ChannelsByUserQueryArgs {
  userId?: string | null; 
}
export interface ChannelsQueryArgs {
  filter?: ChannelFilter | null; 
}
export interface ChannelByNameQueryArgs {
  name: string; 
  isDirect: boolean; 
}
export interface CommentQueryArgs {
  postId: string; 
  prev?: string | null; 
  next?: string | null; 
  limit?: number | null; 
}
export interface GetGiphyQueryArgs {
  searchContent: string; 
}
export interface GetPlacesNearbyQueryArgs {
  nearby?: GetNearByInput | null; 
}
export interface FeaturedPostsQueryArgs {
  feedType: FeedType; 
  prev: string; 
  next: string; 
  count: number; 
}
export interface FriendsPostsQueryArgs {
  feedType: FeedType; 
  prev: string; 
  next: string; 
  count: number; 
}
export interface TrendingPostsQueryArgs {
  feedType: FeedType; 
  prev: string; 
  next: string; 
  count: number; 
}
export interface RecommendedPostsQueryArgs {
  feedType: FeedType; 
  prev: string; 
  next: string; 
  count: number; 
}
export interface SearchQueryArgs {
  content: string; 
}
export interface SuggestQueryArgs {
  content: string; 
}
export interface UserQueryArgs {
  id?: string | null; 
}
export interface SuggestedFriendsQueryArgs {
  id: string; 
  cursor?: string | null; 
  count?: number | null; 
}
export interface FollowersUsersUserArgs {
  cursor?: string | null; 
  limit?: number | null; 
}
export interface FollowingUsersUserArgs {
  cursor?: string | null; 
  limit?: number | null; 
}
export interface PostUserArgs {
  prev?: string | null; 
  next?: string | null; 
  limit?: number | null; 
}
export interface ImagePostUserArgs {
  prev?: string | null; 
  next?: string | null; 
  limit?: number | null; 
}
export interface VideoPostUserArgs {
  prev?: string | null; 
  next?: string | null; 
  limit?: number | null; 
}
export interface ServiceAuthenticateMutationArgs {
  serviceName: string; 
  userFields: PasswordLoginType; 
}
export interface RefreshTokensMutationArgs {
  accessToken: string; 
  refreshToken: string; 
}
export interface LogoutMutationArgs {
  accessToken: string; 
}
export interface ImpersonateMutationArgs {
  accessToken: string; 
  username: string; 
}
export interface RegisterPasswordMutationArgs {
  serviceName: string; 
  user: CreateUserInput; 
}
export interface VerifyEmailMutationArgs {
  token: string; 
}
export interface ResetPasswordMutationArgs {
  token: string; 
  newPassword: string; 
}
export interface SendVerificationEmailMutationArgs {
  email: string; 
}
export interface SendResetPasswordEmailMutationArgs {
  email: string; 
}
export interface CreatePromoPostMutationArgs {
  post?: PromoPostInput | null; 
  file?: File | null; 
}
export interface EditPromoPostMutationArgs {
  post?: PromoPostInput | null; 
}
export interface DeletePromoPostMutationArgs {
  postId?: string | null; 
}
export interface ReferBizMutationArgs {
  userId?: string | null; 
  bizId?: string | null; 
}
export interface AddBizMutationArgs {
  biz?: NewBizInput | null; 
}
export interface EditBizMutationArgs {
  biz?: EditBizInput | null; 
}
export interface DeleteBizMutationArgs {
  bizId?: string | null; 
}
export interface FollowBizMutationArgs {
  bizId: string; 
}
export interface UnfollowBizMutationArgs {
  bizId: string; 
}
export interface LeaveChannelMutationArgs {
  channelId: string; 
}
export interface HideChannelMutationArgs {
  channelId: string; 
}
export interface SetStatusMutationArgs {
  status: UserStatus; 
}
export interface CreateChannelMutationArgs {
  name: string; 
  private?: boolean | null; 
  readOnly?: boolean | null; 
  membersId?: string[] | null; 
}
export interface SendMessageMutationArgs {
  channelId: string; 
  content: string; 
}
export interface DeleteMessageMutationArgs {
  messageId: MessageIdentifier; 
}
export interface EditMessageMutationArgs {
  messageId: MessageIdentifier; 
  content: string; 
}
export interface AddReactionToMassageMutationArgs {
  messageId: MessageIdentifier; 
  icon: string; 
}
export interface UpdateUserSettingsMutationArgs {
  userSettings?: UserSettings | null; 
}
export interface LoginWithServiceAccessTokenMutationArgs {
  service: string; 
  accessToken: string; 
}
export interface AddCommentMutationArgs {
  comment: CommentInput; 
}
export interface DeleteCommentMutationArgs {
  commentId: string; 
}
export interface EditCommentMutationArgs {
  commentId: string; 
  comment: CommentInput; 
}
export interface AddReactionToCommentMutationArgs {
  commentId: string; 
}
export interface RemoveReactionToCommentMutationArgs {
  commentId: string; 
}
export interface RegisterDeviceMutationArgs {
  deviceInput?: Device | null; 
}
export interface UnregisterDeviceMutationArgs {
  deviceInput?: Device | null; 
}
export interface CreatePostMutationArgs {
  post?: PostInput | null; 
}
export interface EditPostMutationArgs {
  post?: PostUpdateInput | null; 
}
export interface DeletePostMutationArgs {
  postId: string; 
}
export interface UploadPhotoMutationArgs {
  file: File; 
}
export interface DeletePhotoMutationArgs {
  id: string; 
}
export interface DeletePhotoFromPostMutationArgs {
  id: string; 
  postId: string; 
}
export interface FavorPostMutationArgs {
  postId: string; 
  like: PostlikeTypes; 
}
export interface UnFavorPostMutationArgs {
  postId: string; 
  like: PostlikeTypes; 
}
export interface BookMarkPostMutationArgs {
  postId: string; 
  bookMark?: Bookmark | null; 
}
export interface UnbookMarkPostMutationArgs {
  postId: string; 
  bookMark?: Bookmark | null; 
}
export interface SharePostMutationArgs {
  postId: string; 
  comment?: string | null; 
}
export interface UnsharePostMutationArgs {
  postId: string; 
}
export interface FollowMutationArgs {
  followingId: string; 
}
export interface UnfollowMutationArgs {
  followerId: string; 
}
export interface UploadProfilePhotoMutationArgs {
  file: File; 
}
export interface UploadProfileBackgroundPhotoMutationArgs {
  file: File; 
}
export interface ApproveFollowerMutationArgs {
  followerId?: string | null; 
}
export interface RejectFollowerMutationArgs {
  followerId?: string | null; 
}
export interface UpdatePersonalInfoMutationArgs {
  personalInfo: PersonalInfoInput; 
}
export interface UpdatePersonalContactMutationArgs {
  personalContact: PersonalContactInput; 
}
export interface UpdateUserCustomUrlMutationArgs {
  customUrls: (CustomUrlsInput | null)[]; 
}
export interface UpdateUserPlacesHistoryMutationArgs {
  placesHistory: PlacesHistoryInput; 
}
export interface UpdateEducationHistoryMutationArgs {
  educationHistory: Education; 
}
export interface UpdateWorkHistoryMutationArgs {
  workHistory: WorkHistoryInput; 
}
export interface UpdateUserStoryMutationArgs {
  userStory: StoryInput; 
}
export interface ReferFriendsMutationArgs {
  emailIds?: (string | null)[] | null; 
}
export interface ChatMessageAddedSubscriptionArgs {
  channelId: string; 
}
export interface NewCommentSubscriptionArgs {
  postId: string; 
}
export interface NewReactionSubscriptionArgs {
  commentId: string; 
  icon: string; 
}

export enum UserStatus {
  ONLINE = "ONLINE",
  AWAY = "AWAY",
  BUSY = "BUSY",
  INVISIBLE = "INVISIBLE",
}

export enum PostVisibility {
  private = "private",
  friends = "friends",
  public = "public",
}

export enum Bookmark {
  mypage = "mypage",
  fun = "fun",
  learn = "learn",
}

export enum Privacy {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  ALL = "ALL",
}

export enum ChannelSort {
  NAME = "NAME",
  NUMBER_OF_MESSAGES = "NUMBER_OF_MESSAGES",
}

export enum FeedType {
  Home = "Home",
  Photos = "Photos",
  Videos = "Videos",
  Fun = "Fun",
  Learn = "Learn",
}

export enum PostlikeTypes {
  like = "like",
  heart = "heart",
  smile = "smile",
  laugh = "laugh",
  sad = "sad",
}

export enum Events {
  newFollower = "newFollower",
  followApproved = "followApproved",
  postShared = "postShared",
  postBookmarked = "postBookmarked",
  commentAdded = "commentAdded",
  reactionAdded = "reactionAdded",
  rewardsUpdated = "rewardsUpdated",
}

export enum HashAlgorithm {
  sha = "sha",
  sha1 = "sha1",
  sha224 = "sha224",
  sha256 = "sha256",
  sha384 = "sha384",
  sha512 = "sha512",
  md5 = "md5",
  ripemd160 = "ripemd160",
}

export enum ViewType {
  Featured = "Featured",
  Friends = "Friends",
  Trending = "Trending",
  Recommended = "Recommended",
}
