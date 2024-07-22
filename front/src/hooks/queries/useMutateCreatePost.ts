import {createPost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

export const useMutateCreatePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};
