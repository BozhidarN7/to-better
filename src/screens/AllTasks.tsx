import { useSuspenseQuery } from '@apollo/client';
import { Suspense, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { CalendadrButton } from '@/components/CalendarButton';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { WeeklyCard } from '@/components/WeeklyCard';
import { WeeklyCardPlaceholder } from '@/components/WeeklyCardPlaceholder';
import { GET_WEEKS } from '@/gql/queries';
import { initializeTasks } from '@/store/slices/task-slice';
import { createDate } from '@/utils';

function WeeksList() {
  const dispatch = useDispatch();
  const { data } = useSuspenseQuery(GET_WEEKS);

  const orderedByWeeksDescending = useMemo(() => {
    return data.weeks
      .map((week) => week)
      .sort(
        (a, b) =>
          createDate(b.sevenDaysPeriod.startDate)!.valueOf() -
          createDate(a.sevenDaysPeriod.startDate)!.valueOf(),
      );
  }, [data.weeks]);

  useEffect(() => {
    dispatch(initializeTasks({ tasks: data.weeks }));
  }, [data.weeks, dispatch]);

  return (
    <>
      <FlatList
        style={styles.allTasksContainer}
        data={orderedByWeeksDescending}
        renderItem={(item) => <WeeklyCard tasksData={item.item} />}
      />
      <CalendadrButton />
    </>
  );
}

export default function AllTasks() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<WeeklyCardPlaceholder />}>
        <WeeksList />
      </Suspense>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
