import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

interface IconGroupsMap {
  [key: string]: typeof FontAwesome | typeof Ionicons;
}
interface IconButtonProps {
  iconGroup: string;
  icon: keyof typeof FontAwesome.glyphMap | keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
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
  onPress,
}: IconButtonProps) {
  const IconGroup = iconGroups[iconGroup] as React.ComponentType<{
    name: string;
    size: number;
    color: string;
  }>;

  return (
    <Pressable onPress={onPress}>
      <IconGroup name={icon} size={size} color={color} />
    </Pressable>
  );
}
