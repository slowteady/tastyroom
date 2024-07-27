import {colors} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from './HeaderButton';

type FeedHomeHeaderLeftProps = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<FeedStackParamList, 'FeedHome'>,
    DrawerNavigationProp<MainDrawerParamList>
  >;
  route: RouteProp<FeedStackParamList, 'FeedHome'>;
};

const FeedHomeHeaderLeft = (navigation: FeedHomeHeaderLeftProps) => {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.navigation.openDrawer()}
    />
  );
};

export default FeedHomeHeaderLeft;
