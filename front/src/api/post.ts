import {ImageUri, Post} from '@/types/domain';
import {axiosInstance} from './axios';

export type ResponsePost = Post & {images: ImageUri[]};
export type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};
export type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

export const createPost = async (
  body: RequestCreatePost,
): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);

  return data;
};

export const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'> & {
    imageUris: ImageUri[];
  };
};

export const updatePost = async ({
  id,
  body,
}: RequestUpdatePost): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
};

export const updateFavoritePost = async (id: number): Promise<number> => {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
};

export const getFavoritePost = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/favorites/my?page=${page}`);

  return data;
};

export type CalendarPost = {
  id: number;
  title: string;
  address: string;
};

export type ResponseCalendarPost = Record<number, CalendarPost[]>;

export const getCalendarPosts = async (
  year: number,
  month: number,
): Promise<ResponseCalendarPost> => {
  const {data} = await axiosInstance.get(`/posts?year=${year}&month=${month}`);

  return data;
};
