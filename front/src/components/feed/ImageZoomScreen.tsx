import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailPostStore from '@/store/useDetailPostStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import ImageCarousel from '../common/ImageCarousel';

type ImageZoomScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

const ImageZoomScreen = ({route}: ImageZoomScreenProps) => {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();

  return (
    <ImageCarousel images={detailPost?.images || []} pressedIndex={index} />
  );
};

export default ImageZoomScreen;
