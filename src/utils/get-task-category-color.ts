import { COLORS, CATEGORIES } from '@/constants';

export default function getTaskCategoryColor(category: string) {
  const categoryToLowerCase = category.toLowerCase();
  if (categoryToLowerCase === CATEGORIES.HOME) {
    return COLORS.CATEGORY_HOME;
  } else if (categoryToLowerCase === CATEGORIES.OUTDOOR) {
    return COLORS.CATEGORY_OUTDOOR;
  } else if (categoryToLowerCase === CATEGORIES.TRAINING) {
    return COLORS.CATEGORY_TRAINING;
  } else if (categoryToLowerCase === CATEGORIES.SHOPPING) {
    return COLORS.CATEGORY_SHOPPING;
  } else {
    return COLORS.CATEGORY_LEARNING;
  }
}
