import {updateFavoritePost} from '@/api';
import {queryClient} from '@/api/queryClient';
import {queryKeys} from '@/constants/keys';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateFavoritePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.POST,
          queryKeys.FAVORITE,
          queryKeys.GET_FAVORITE_POSTS,
        ],
      });
    },
    ...mutationOptions,
  });
};

export default useMutateFavoritePost;
