import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {authNavigations} from '../../constants/navigations';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';

const AuthHomeScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/main.jpeg')}
        />
      </View>
      <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
  },
});

export default AuthHomeScreen;
