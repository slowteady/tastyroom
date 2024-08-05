import {authNavigations} from '@/constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.KAKAO]: undefined;
};

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: 'white'},
        headerTitleStyle: {fontSize: 15},
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="AuthHome"
        component={AuthHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitle: '로그인'}}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KakaoLoginScreen}
        options={{headerTitle: '카카오 로그인'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
