import { Categories, Priorities } from '@/enums';
import { TasksState } from '@/types/tasks';

const tasksState: TasksState[] = [
  {
    id: 'week1',
    sevenDaysPeriod: {
      startDate: '15.01.2024',
      endDate: '21.01.2024',
    },
    totalTasks: 3,
    tasksCompleted: 1,
    tasks: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [
        {
          id: 'task1',
          title: 'Clean the dishes',
          description: 'All of them',
          category: Categories.Home,
          priority: Priorities.Medium,
          isCompleted: true,
        },
        {
          id: 'task2',
          title: 'Workout',
          description: 'Run 5 km',
          category: Categories.Outdoor,
          priority: Priorities.High,
          isCompleted: true,
        },
        {
          id: 'task3',
          title: 'Lear about React Native',
          description: 'Investigate native modules',
          category: Categories.Learning,
          priority: Priorities.Medium,
          isCompleted: false,
        },
      ],
      saturday: [],
      sunday: [],
    },
  },
];

export default tasksState;
