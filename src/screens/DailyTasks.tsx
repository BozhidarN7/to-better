import { useLayoutEffect, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Task } from '@/components/Task';
import { IconButton } from '@/components/common';
import { COLORS, DAYS_OF_THE_WEEK, ICON_GROUPS } from '@/constants';
import { RootState } from '@/store';
import { DailyTasksProps } from '@/types/navigator-types/root-stack-param-list';
import { TasksState } from '@/types/tasks';
import {
  calculateTasksProgress,
  getCompletedTasksCount,
  getDateAndMonth,
  padToTwoDigits,
} from '@/utils';

export default function DailyTasks({ route, navigation }: DailyTasksProps) {
  const { day, date, month, weekId } = route.params;
  const tasksState = useSelector<RootState, TasksState[]>(
    (state) => state.tasks,
  );
  const week = tasksState.find((weeks) => weeks._id === weekId);
  const dayOfTheWeekIndex =
    date -
    Number(
      getDateAndMonth(week?.sevenDaysPeriod.startDate || '').split('.')[0],
    );

  const currentDayTasks = useMemo(
    () => week?.tasks[DAYS_OF_THE_WEEK[Math.abs(dayOfTheWeekIndex)]] || [],
    [dayOfTheWeekIndex, week?.tasks],
  );
  const hasTasks = currentDayTasks.length > 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day.replace(/^\w/, (c) => c.toUpperCase())} (${padToTwoDigits(date)}.${padToTwoDigits(month)})`,
      headerRight: () => (
        <Text style={styles.headerRightStyles}>
          {calculateTasksProgress(
            getCompletedTasksCount(currentDayTasks),
            currentDayTasks.length,
          )}
          %
        </Text>
      ),
    });
  }, [currentDayTasks, date, day, month, navigation]);

  return (
    <>
      {hasTasks ? (
        <FlatList
          data={currentDayTasks}
          renderItem={(item) => (
            <Task taskInfo={item.item} weekId={weekId} day={day} date={date} />
          )}
        />
      ) : (
        <Text style={styles.noTasksText}>No tasks for this day</Text>
      )}

      <View style={styles.addButtonContainer}>
        <IconButton
          iconGroup={ICON_GROUPS.Ionicons}
          icon="add-circle"
          color={COLORS.SECONDARY_300}
          size={56}
          onPress={() => {
            navigation.navigate(
              ...(['CreateTasks', { date, weekId, day }] as never),
            );
          }}
          stylesOnPressed={styles.addButtonPressed}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerRightStyles: {
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  noTasksText: {
    fontSize: 16,
    margin: 16,
  },
  addButtonPressed: {
    opacity: 0.75,
  },
});
