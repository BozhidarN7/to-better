import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

type IconTypes =
  | keyof typeof FontAwesome.glyphMap
  | keyof typeof Ionicons.glyphMap
  | keyof typeof MaterialIcons.glyphMap;

export default IconTypes;
