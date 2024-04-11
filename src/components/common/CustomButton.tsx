import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import Icon from './Icon';

import { COLORS } from '@/constants';
import { IconTypes } from '@/types';

interface CustomButtonProps {
  text: string;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<ViewStyle>;
  pressedStyles?: StyleProp<ViewStyle>;
  icon?: {
    iconGroup: string;
    icon: IconTypes;
    color: string;
    size: number;
  };
  onPress: () => void;
}

export default function CustomButton({
  text,
  buttonStyles,
  textStyles,
  pressedStyles,
  icon,
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
      {icon && (
        <Icon
          iconGroup={icon.iconGroup}
          icon={icon.icon}
          color={COLORS.PRIMARY}
          size={24}
        />
      )}
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '60%',
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
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
