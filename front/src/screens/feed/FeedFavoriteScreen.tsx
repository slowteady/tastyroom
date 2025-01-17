import {colors} from '@/constants';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface FeedFavoriteScreenProps {
  //
}

const FeedFavoriteScreen = ({}: FeedFavoriteScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
