import {uploadImages} from '@/api';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

const useMutateImages = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
};

export default useMutateImages;
