import {alerts, feedNavigations} from '@/constants';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailPostStore from '@/store/useDetailPostStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import CompoundOption from '../common/CompoundOption';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const FeedDetailOption = ({isVisible, hideOption}: FeedDetailOptionProps) => {
  const deletePost = useMutateDeletePost();
  const {detailPost} = useDetailPostStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<FeedStackParamList>>();

  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }

    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  const handleEditPost = () => {
    if (!detailPost) {
      return;
    }

    navigation.navigate(feedNavigations.EDIT_POST, {
      location: {
        latitude: detailPost.latitude,
        longitude: detailPost.longitude,
      },
    });
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Container>
        <CompoundOption.Button onPress={handleDeletePost}>
          삭제하기
        </CompoundOption.Button>
        <CompoundOption.Divider />
        <CompoundOption.Button onPress={handleEditPost}>
          수정하기
        </CompoundOption.Button>
      </CompoundOption.Container>
      <CompoundOption.Container>
        <CompoundOption.Button isDanger onPress={hideOption}>
          취소
        </CompoundOption.Button>
      </CompoundOption.Container>
    </CompoundOption>
  );
};

export default FeedDetailOption;
