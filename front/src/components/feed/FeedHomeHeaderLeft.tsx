import {colors} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../common/HeaderButton';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  NativeStackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors.BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default FeedHomeHeaderLeft;
