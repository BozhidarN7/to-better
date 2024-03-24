import { Categories, Priorities } from '@/enums';
import { TasksState } from '@/types/tasks';

const tasksState: TasksState[] = [
  {
    _id: 'week1',
    sevenDaysPeriod: {
      startDate: '15.01.2024',
      endDate: '21.01.2024',
    },
    totalTasks: 3,
    tasksCompleted: 2,
    tasks: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [
        {
          _id: 'task1',
          title: 'Clean the dishes',
          description: 'All of them',
          category: Categories.Home,
          priority: Priorities.Medium,
          isCompleted: true,
          weekId: 'week1',
          dayOfWeek: 'friday',
        },
        {
          _id: 'task2',
          title: 'Workout',
          description: 'Run 5 km',
          category: Categories.Outdoor,
          priority: Priorities.High,
          isCompleted: true,
          weekId: 'week1',
          dayOfWeek: 'friday',
        },
        {
          _id: 'task3',
          title: 'Lear about React Native',
          description: 'Investigate native modules',
          category: Categories.Learning,
          priority: Priorities.Medium,
          isCompleted: false,
          weekId: 'week1',
          dayOfWeek: 'friday',
        },
      ],
      saturday: [],
      sunday: [],
    },
  },
  {
    _id: 'week2',
    sevenDaysPeriod: {
      startDate: '05.02.2024',
      endDate: '11.02.2024',
    },
    totalTasks: 1,
    tasksCompleted: 0,
    tasks: {
      monday: [],
      tuesday: [
        {
          _id: 'task1',
          title: 'Fix the doors',
          description:
            'Two of the doors have problems with the closing Two of the doors have problems with the closing',
          category: Categories.Home,
          priority: Priorities.Medium,
          isCompleted: false,
          weekId: 'week2',
          dayOfWeek: 'tuesday',
        },
      ],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  },
];

export default tasksState;
