import { NativeStackScreenProps } from '@react-navigation/native-stack';

import DayOfWeek from '../day-of-week';

type RootStackParamList = {
  AllTasks: undefined;
  CreateTasks: {
    date: number;
    weekId: string;
    edit?: boolean;
    day?: DayOfWeek;
    taskId?: string;
  };
  DailyTasks: {
    day: string;
    date: number;
    month: number;
    weekId: string;
  };
  Register: undefined;
  Login: undefined;
};

export type DailyTasksProps = NativeStackScreenProps<
  RootStackParamList,
  'DailyTasks'
>;

export type CreateTasksProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateTasks'
>;

export default RootStackParamList;
