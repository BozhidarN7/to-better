import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { WeeklyCard } from '@/components/WeeklyCard';
import { RootState } from '@/store';
import { TasksState } from '@/types/tasks';
import { createDate } from '@/utils';

export default function AllTasks() {
  const tasksState = useSelector<RootState, TasksState[]>(
    (state) => state.tasks,
  );

  const orderedByWeeksDescending = useMemo(
    () =>
      tasksState
        .map((week) => week)
        .sort(
          (a, b) =>
            createDate(b.sevenDaysPeriod.startDate)!.valueOf() -
            createDate(a.sevenDaysPeriod.startDate)!.valueOf(),
        ),
    [tasksState],
  );

  return (
    <FlatList
      style={styles.allTasksContainer}
      data={orderedByWeeksDescending}
      renderItem={(item) => <WeeklyCard tasksData={item.item} />}
    />
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
