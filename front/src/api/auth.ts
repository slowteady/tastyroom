import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';
import {axiosInstance} from './axios';

export type RequestUser = {
  email: string;
  password: string;
};

export const postSignup = async ({
  email,
  password,
}: RequestUser): Promise<void> => {
  const url = '/auth/signup';
  const body = {email, password};
  const {data} = await axiosInstance.post(url, body);

  return data;
};

export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

export const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const url = '/auth/signin';
  const body = {email, password};
  const {data} = await axiosInstance.post(url, body);

  return data;
};

export type ResponseProfile = Profile & Category;

export const getProfile = async (): Promise<ResponseProfile> => {
  const url = '/auth/me';
  const {data} = await axiosInstance.get(url);

  return data;
};

export const getAccessToken = async (): Promise<ResponseToken> => {
  const url = '/auth/refresh';
  const refreshToken = await getEncryptStorage('refreshToken');
  const headers = {
    headers: {Authorization: `Bearer ${refreshToken}`},
  };

  const {data} = await axiosInstance.get(url, headers);

  return data;
};

export const logout = async (): Promise<void> => {
  const url = '/auth/logout';
  await axiosInstance.post(url);
};

export const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});

  return data;
};
