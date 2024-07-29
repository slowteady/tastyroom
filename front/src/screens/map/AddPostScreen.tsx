import PostForm from '@/components/post/PostForm';
import {mapNavigations} from '@/constants';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

type AddPostScreenProps = NativeStackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

const AddPostScreen = ({route}: AddPostScreenProps) => {
  const {location} = route.params;

  return <PostForm location={location} />;
};

export default AddPostScreen;
