import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {authNavigations} from '../../constants';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

const AuthHomeScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList>) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Button
          title="회원가입으로 이동"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthHomeScreen;
