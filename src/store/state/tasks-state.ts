import { Categories, Priorities } from '@/enums';
import { TasksState } from '@/types/tasks';
import { createDate } from '@/utils';

const tasksState: TasksState[] = [
  {
    sevenDaysPeriod: {
      startDate: createDate('15/01/2024') || new Date(),
      endDate: createDate('21/01/2024') || new Date(),
    },
    tasks: [
      {
        id: 'task1',
        title: 'Clean the dishes',
        description: 'All of them',
        category: Categories.Home,
        priority: Priorities.Medium,
      },
      {
        id: 'task2',
        title: 'Workout',
        description: 'Run 5 km',
        category: Categories.Outdoor,
        priority: Priorities.High,
      },
      {
        id: 'task3',
        title: 'Lear about React Native',
        description: 'Investigate native modules',
        category: Categories.Learning,
        priority: Priorities.Medium,
      },
    ],
  },
];

export default tasksState;
