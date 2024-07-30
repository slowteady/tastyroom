export const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'post',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
  FAVORITE: 'favorite',
  GET_FAVORITE_POSTS: 'getFavoritePosts',
} as const;

export const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;
