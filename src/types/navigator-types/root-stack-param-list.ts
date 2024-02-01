import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AllTasks: undefined;
  CreateTasks: {
    date: number;
    weekId: string;
  };
  DailyTasks: {
    day: string;
    date: number;
    month: number;
    weekId: string;
  };
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
