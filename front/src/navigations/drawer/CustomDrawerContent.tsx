import {colors} from '@/constants';
import {useAuth} from '@/hooks/queries/useAuth';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {getProfileQuery, logoutMutation} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {
    email: null,
    nickname: null,
    imageUri: null,
    kakaoImageUri: null,
  };

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        {...props}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {imageUri === null && kakaoImageUri === null && (
              <MaterialIcon name="face" size={70} style={styles.userImage} />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <Image source={{uri: kakaoImageUri}} style={styles.userImage} />
            )}
            {imageUri !== null && (
              <Image source={{uri: imageUri}} style={styles.userImage} />
            )}
          </View>

          <Text style={styles.nameText}>{nickname || email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        onPress={handleLogout}
        style={{alignItems: 'flex-end', padding: 10}}>
        <Text>로그아웃</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors.BLACK,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
});

export default CustomDrawerContent;
