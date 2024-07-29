import PostForm from '@/components/post/PostForm';
import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

type EditPostScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

const EditPostScreen = ({route}: EditPostScreenProps) => {
  const {location} = route.params;

  return <PostForm location={location} isEdit />;
};

export default EditPostScreen;
