import { FontAwesome, Ionicons } from '@expo/vector-icons';

type DropDownOption = {
  label: string;
  value: string;
  icon?: {
    iconGroup: string;
    icon: keyof typeof FontAwesome.glyphMap | keyof typeof Ionicons.glyphMap;
    color: string;
    size: number;
  };
};

export default DropDownOption;
