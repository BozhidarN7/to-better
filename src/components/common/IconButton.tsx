import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import Icon from './Icon';

interface IconButtonProps {
  iconGroup: string;
  icon:
    | keyof typeof FontAwesome.glyphMap
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
  stylesOnPressed?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledStyles?: StyleProp<ViewStyle>;
}

export default function IconButton({
  iconGroup,
  icon,
  size,
  color,
  stylesOnPressed,
  disabled,
  disabledStyles,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && stylesOnPressed,
        disabled && disabledStyles,
      ]}
      disabled={disabled}
    >
      <Icon iconGroup={iconGroup} icon={icon} size={size} color={color} />
    </Pressable>
  );
}
