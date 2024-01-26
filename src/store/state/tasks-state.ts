import { Categories, Priorities } from '@/enums';
import { TasksState } from '@/types/tasks';
import { createDate } from '@/utils';

const tasksState: TasksState[] = [
  {
    id: 'week1',
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
        dueDate: createDate('15/01/2024') || new Date(),
      },
      {
        id: 'task2',
        title: 'Workout',
        description: 'Run 5 km',
        category: Categories.Outdoor,
        priority: Priorities.High,
        dueDate: createDate('16/01/2024') || new Date(),
      },
      {
        id: 'task3',
        title: 'Lear about React Native',
        description: 'Investigate native modules',
        category: Categories.Learning,
        priority: Priorities.Medium,
        dueDate: createDate('17/01/2024') || new Date(),
      },
      {
        id: 'task4',
        title: 'Read a book',
        description: 'Investigate native modules',
        category: Categories.Learning,
        priority: Priorities.Medium,
        dueDate: createDate('18/01/2024') || new Date(),
      },
      {
        id: 'task5',
        title: 'Go for a walk',
        description: 'Investigate native modules',
        category: Categories.Outdoor,
        priority: Priorities.Medium,
        dueDate: createDate('19/01/2024') || new Date(),
      },
      {
        id: 'task6',
        title: 'Watch a wondeful movie with your lovely ones',
        description: 'Investigate native modules',
        category: Categories.Home,
        priority: Priorities.VeryHigh,
        dueDate: createDate('20/01/2024') || new Date(),
      },
      {
        id: 'task7',
        title: 'Clean the house',
        description: 'Investigate native modules',
        category: Categories.Home,
        priority: Priorities.Medium,
        dueDate: createDate('21/01/2024') || new Date(),
      },
      {
        id: 'task8',
        title: 'Tidy your room',
        description: 'Investigate native modules',
        category: Categories.Home,
        priority: Priorities.Medium,
        dueDate: createDate('17/01/2024') || new Date(),
      },
    ],
  },
];

export default tasksState;
