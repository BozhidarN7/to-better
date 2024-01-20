import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface IconGroupsMap {
  [key: string]: typeof FontAwesome | typeof Ionicons;
}
interface IconButtonProps {
  iconGroup: string;
  icon: keyof typeof FontAwesome.glyphMap | keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
  stylesOnPressed?: StyleProp<ViewStyle>;
}

const iconGroups: IconGroupsMap = {
  FontAwesome,
  Ionicons,
};

export default function IconButton({
  iconGroup,
  icon,
  size,
  color,
  stylesOnPressed,
  onPress,
}: IconButtonProps) {
  const IconGroup = iconGroups[iconGroup] as React.ComponentType<{
    name: string;
    size: number;
    color: string;
  }>;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && stylesOnPressed]}
    >
      <IconGroup name={icon} size={size} color={color} />
    </Pressable>
  );
}
