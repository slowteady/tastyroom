import {colors} from '@/constants';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const DayOfWeeks = () => {
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, index) => (
        <View key={index} style={styles.item}>
          <Text
            style={[
              styles.text,
              dayOfWeek === '토' && styles.saturdayText,
              dayOfWeek === '일' && styles.sundayText,
            ]}>
            {dayOfWeek}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: Dimensions.get('window').width / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
  },
  saturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});

export default DayOfWeeks;
