import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AllTasks: undefined;
  CreateTasks: undefined;
  DailyTasks: {
    day: string;
  };
};

export type DailyTasksProps = NativeStackScreenProps<
  RootStackParamList,
  'DailyTasks'
>;

export default RootStackParamList;
