import { useSuspenseQuery } from '@apollo/client';
import { Suspense, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { WeeklyCard } from '@/components/WeeklyCard';
import { WeeklyCardPlaceholder } from '@/components/WeeklyCardPlaceholder';
import { GET_WEEKS } from '@/gql/queries';
import { createDate } from '@/utils';

function WeeksList() {
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

  return (
    <FlatList
      style={styles.allTasksContainer}
      data={orderedByWeeksDescending}
      renderItem={(item) => <WeeklyCard tasksData={item.item} />}
    />
  );
}

export default function AllTasks() {
  return (
    <Suspense fallback={<WeeklyCardPlaceholder />}>
      <WeeksList />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
