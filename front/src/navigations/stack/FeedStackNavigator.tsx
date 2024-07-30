import EditPostScreen from '@/components/feed/EditPostScreen';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import ImageZoomScreen from '@/components/feed/ImageZoomScreen';
import {feedNavigations} from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LatLng} from 'react-native-maps';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
};

const FeedStackNavigator = () => {
  const Stack = createNativeStackNavigator<FeedStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerTitleStyle: {fontSize: 15},
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="FeedHome"
        component={FeedHomeScreen}
        options={navigation => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
