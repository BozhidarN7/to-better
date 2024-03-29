import DayOfWeek from '../day-of-week';

import { Categories, Priorities } from '@/enums';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: Priorities;
  category: Categories;
  isCompleted: boolean;
  dayOfWeek: DayOfWeek;
  weekId: string;
}

export default Task;
