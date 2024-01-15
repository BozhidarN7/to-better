import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';

interface IconButtonProps {
  icon: keyof typeof FontAwesome.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
}

export default function IconButton({
  icon,
  size,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name={icon} size={size} color={color} />
    </Pressable>
  );
}
