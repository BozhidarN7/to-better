import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { WeeklyCard } from '@/components/WeeklyCard';
import { RootState } from '@/store';
import { TasksState } from '@/types/tasks';

export default function AllTasks() {
  const tasksState = useSelector<RootState, TasksState[]>(
    (state) => state.tasks,
  );

  return (
    <FlatList
      style={styles.allTasksContainer}
      data={tasksState}
      renderItem={(item) => <WeeklyCard tasksData={item.item} />}
    />
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
