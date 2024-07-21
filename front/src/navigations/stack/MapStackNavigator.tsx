import {mapNavigations} from '@/constants';
import AddPostScreen from '@/screens/map/AddPostScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
};

const MapStackNavigator = () => {
  const Stack = createNativeStackNavigator<MapStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerTitleStyle: {fontSize: 15},
        headerStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{headerTitle: '장소 추가', headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
