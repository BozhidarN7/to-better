import { COLORS, ICON_GROUPS } from '@/constants';
import { DropDownOption } from '@/types';

const priorityOptions: DropDownOption[] = [
  {
    label: 'Low',
    value: 'low',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_LOW,
      size: 24,
    },
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_MEDIUM,
      size: 24,
    },
  },
  {
    label: 'High',
    value: 'high',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_HIGH,
      size: 24,
    },
  },
  {
    label: 'Very High',
    value: 'very high',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_VERY_HIGH,
      size: 24,
    },
  },
];

export default priorityOptions;
