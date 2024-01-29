import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AllTasks: undefined;
  CreateTasks: {
    date: number;
    month: number;
  };
  DailyTasks: {
    day: string;
    date: number;
    month: number;
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
