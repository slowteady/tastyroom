import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import {useAuth} from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {UserInformation, validateLogin} from '@/utils';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const login = useForm<UserInformation>({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });
  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry
          returnKeyType="join"
          blurOnSubmit={false}
          touched={login.touched.password}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
