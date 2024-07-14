import {useAuth} from '@/hooks/queries/useAuth';
import React from 'react';
import {Button, Text, View} from 'react-native';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();

  return (
    <View>
      <Text>앱 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
};

export default MapHomeScreen;
