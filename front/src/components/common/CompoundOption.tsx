import {colors} from '@/constants';
import React, {PropsWithChildren} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CompoundOptionProps {
  children: React.ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animateType?: ModalProps['animationType'];
}

const OptionMain = ({
  children,
  isVisible,
  hideOption,
  animateType = 'fade',
}: CompoundOptionProps) => {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animateType}
      onRequestClose={hideOption}>
      <SafeAreaView style={styles.optionBackground} onTouchEnd={onClickOutSide}>
        {children}
      </SafeAreaView>
    </Modal>
  );
};

const Container = ({children}: PropsWithChildren) => {
  return <View style={styles.optionContainer}>{children}</View>;
};

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  isDanger?: boolean;
}

const Button = ({children, isDanger = false, ...props}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...props}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
    </Pressable>
  );
};

const Title = ({children}: PropsWithChildren) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.border} />;
};

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  Button,
  Title,
  Divider,
});

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0 / 0.2)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.BLUE_500,
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});

export default CompoundOption;
