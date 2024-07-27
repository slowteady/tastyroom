import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';
import {feedNavigations} from '@/constants';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: undefined;
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
      <Stack.Screen name="FeedDetail" component={FeedDetailScreen} />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
