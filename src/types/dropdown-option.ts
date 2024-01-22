import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

type DropDownOption = {
  label: string;
  value: string;
  icon?: {
    iconGroup: string;
    icon:
      | keyof typeof FontAwesome.glyphMap
      | keyof typeof Ionicons.glyphMap
      | keyof typeof MaterialIcons.glyphMap;
    color: string;
    size: number;
  };
};

export default DropDownOption;
