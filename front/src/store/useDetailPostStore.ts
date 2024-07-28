import {ResponsePost} from '@/api';
import {create} from 'zustand';

interface DetailPostStore {
  detailPost: ResponsePost | null;
  setDetailPost: (detailPost: ResponsePost) => void;
}

const useDetailPostStore = create<DetailPostStore>(set => ({
  detailPost: null,
  setDetailPost: (detailPost: ResponsePost) => {
    set({detailPost});
  },
}));

export default useDetailPostStore;
