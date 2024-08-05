import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import {authNavigations} from '@/constants/navigations';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

const AuthHomeScreen = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/main.jpeg')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오 로그인하기"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={<Iconicons name="chatbubble-sharp" color="#181500" size={16} />}
        />
        <CustomButton
          label="이메일 로그인하기"
          variant="filled"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
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
    alignItems: 'center',
    gap: 10,
  },
  kakaoButtonContainer: {
    backgroundColor: '#FEE503',
  },
  kakaoButtonText: {
    color: '#181600',
  },
  emailText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: colors.BLACK,
  },
});

export default AuthHomeScreen;
