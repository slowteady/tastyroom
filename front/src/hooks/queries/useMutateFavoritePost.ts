import {updateFavoritePost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateFavoritePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });
    },
    ...mutationOptions,
  });
};

export default useMutateFavoritePost;
