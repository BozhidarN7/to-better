import { Categories, Priorities } from '@/enums';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priorities;
  category: Categories;
  dueDate: Date;
}

export default Task;
