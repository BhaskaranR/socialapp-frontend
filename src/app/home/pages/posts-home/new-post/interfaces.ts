enum PostVisibility {
    private,
    friends,
    public
}

export interface CoordinatesInput {
    long: number
    lat: number
}

export interface  GeotagInput {
    type: string
    coordinates: CoordinatesInput
    title: string
    placeId: string
}

export interface PostInput {
    title: string,
    bizId: string,
    content: string,
    geotag: GeotagInput,
    withFriends: [string],
    fileIds: [string],
    visibility: PostVisibility
}



export interface CreatePostStatus {
    error: boolean;
    created: boolean;
  }