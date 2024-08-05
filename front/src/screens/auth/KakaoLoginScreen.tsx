import {colors} from '@/constants';
import {useAuth} from '@/hooks/queries/useAuth';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

interface KakaoLoginScreenProps {
  //
}

const KakaoLoginScreen = ({}: KakaoLoginScreenProps) => {
  const {kakaoLoginMutation} = useAuth();
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const CLIENT_ID = '8273582e9ba7f9d4471e151d53f21f3a';
  const REDIRECT_URI = 'http://localhost:3030/auth/oauth/kakao';

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      url: 'https://kauth.kakao.com/oauth/token',
      method: 'post',
      params: {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });
    console.log('🔥 / requestToken / response:', response);

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isChangeNavigate || isLoading) && (
        <View style={styles.kakaoLoadingContiner}>
          <ActivityIndicator size={'small'} color={colors.BLACK} />
        </View>
      )}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript="window.ReactNativeWebView.postMessage(''))"
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  kakaoLoadingContiner: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;
