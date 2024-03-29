import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { COLORS } from '@/constants';

interface CustomButtonProps {
  text: string;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  pressedStyles?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export default function CustomButton({
  text,
  buttonStyles,
  textStyles,
  pressedStyles,
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.root,
        buttonStyles,
        pressed && pressedStyles,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '60%',
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SECONDARY_200,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 'auto',
    color: COLORS.PRIMARY,
  },
});
