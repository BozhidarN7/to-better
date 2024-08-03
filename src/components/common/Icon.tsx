import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { IconTypes } from '@/types';

interface IconGroupsMap {
  [key: string]: typeof FontAwesome | typeof Ionicons | typeof MaterialIcons;
}
export interface IconProps {
  iconGroup: string;
  icon: IconTypes;
  color: string;
  size: number;
}

const iconGroups: IconGroupsMap = {
  FontAwesome,
  Ionicons,
  MaterialIcons,
};

export default function Icon({ iconGroup, icon, size, color }: IconProps) {
  const IconGroup = iconGroups[iconGroup] as React.ComponentType<{
    name: string;
    size: number;
    color: string;
  }>;

  return <IconGroup name={icon} size={size} color={color} />;
}
