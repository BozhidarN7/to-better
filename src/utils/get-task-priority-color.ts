import { COLORS, PRIORITIES } from '@/constants';

export default function getTaskPriorityColor(priority: string) {
  const priorityToLowerCase = priority.toLowerCase();
  if (priorityToLowerCase === PRIORITIES.MEDIUM) {
    return COLORS.PRIORITY_MEDIUM;
  } else if (priorityToLowerCase === PRIORITIES.HIGH) {
    return COLORS.PRIORITY_HIGH;
  } else if (priorityToLowerCase === PRIORITIES.VERY_HIGH) {
    return COLORS.PRIORITY_VERY_HIGH;
  } else {
    return COLORS.PRIORITY_LOW;
  }
}
