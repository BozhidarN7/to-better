import { COLORS, ICON_GROUPS } from '@/constants';
import { DropDownOption } from '@/types';

const categoryOptions: DropDownOption[] = [
  {
    label: 'Home',
    value: 'home',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_HOME,
      size: 24,
    },
  },
  {
    label: 'Outdoor',
    value: 'outdoor',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_OUTDOOR,
      size: 24,
    },
  },
  {
    label: 'Shopping',
    value: 'shopping',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_SHOPPING,
      size: 24,
    },
  },
  {
    label: 'Training',
    value: 'training',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_TRAINING,
      size: 24,
    },
  },
  {
    label: 'Learning',
    value: 'learning',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_LEARNING,
      size: 24,
    },
  },
];

export default categoryOptions;
