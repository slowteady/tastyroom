import {getCalendarPosts, ResponseCalendarPost} from '@/api';
import {queryKeys} from '@/constants/keys';
import {UseQueryCustomOptions} from '@/types/common';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

const useGetCalendarPosts = (
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) => {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData,
    ...queryOptions,
  });
};

export default useGetCalendarPosts;
