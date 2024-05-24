import { useSuspenseQuery } from '@apollo/client';
import { Suspense, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { CalendadrButton } from '@/components/CalendarButton';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { WeeklyCard } from '@/components/WeeklyCard';
import { WeeklyCardPlaceholder } from '@/components/WeeklyCardPlaceholder';
import { GET_WEEKS } from '@/gql/queries';
import { setFirstYearWithTasks } from '@/store/slices/global-slice';
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

  useEffect(() => {
    dispatch(
      setFirstYearWithTasks({
        year: Number(
          orderedByWeeksDescending
            .at(-1)
            ?.sevenDaysPeriod.startDate.split('.')
            .at(-1) || new Date().getFullYear(),
        ),
      }),
    );
  });

  const renderWhenThereAreNoSelectedWeeks = () => {
    return (
      <View style={styles.noTasksContainer}>
        <Text>Please select weeks you want to see from the calendar</Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        style={styles.allTasksContainer}
        contentContainerStyle={[
          orderedByWeeksDescending.length === 0 && styles.noTasksContainer,
        ]}
        data={orderedByWeeksDescending}
        renderItem={(item) => <WeeklyCard tasksData={item.item} />}
        ListEmptyComponent={renderWhenThereAreNoSelectedWeeks()}
      />
      {/* <CalendadrButton /> */}
    </>
  );
}

export default function AllTasks() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<WeeklyCardPlaceholder />}>
        <WeeksList />
      </Suspense>
      <CalendadrButton />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
