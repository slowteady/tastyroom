import {
  MutationOptions,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
> = Omit<
  MutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

export type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;
