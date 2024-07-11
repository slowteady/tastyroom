import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {authNavigations} from '../../constants/navigations';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

const AuthHomeScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList>) => {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인하기"
          variant="filled"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthHomeScreen;
