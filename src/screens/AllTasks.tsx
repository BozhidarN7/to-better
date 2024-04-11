import { useSuspenseQuery } from '@apollo/client';
import { Suspense, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { WeeklyCard } from '@/components/WeeklyCard';
import { WeeklyCardPlaceholder } from '@/components/WeeklyCardPlaceholder';
import { CustomButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
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
      <View style={styles.weeksButtonContainer}>
        <CustomButton
          text="Weeks"
          buttonStyles={styles.weeksButton}
          pressedStyles={styles.weeksButtonPressed}
          onPress={() => {}}
          icon={{
            iconGroup: ICON_GROUPS.Ionicons,
            icon: 'calendar',
            color: COLORS.PRIMARY,
            size: 24,
          }}
        />
      </View>
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
  weeksButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  weeksButton: {
    width: 120,
    elevation: 4,
  },
  weeksButtonPressed: {
    opacity: 0.75,
  },
});
