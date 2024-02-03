import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, DAYS_OF_THE_WEEK } from '@/constants';
import { TasksState } from '@/types/tasks';
import {
  calculateTasksProgress,
  getCompletedTasksCount,
  getDateAndMonth,
  padToTwoDigits,
} from '@/utils';

interface WeeklyDaysProps {
  tasksData: TasksState;
}

export default function WeeklyDays({ tasksData }: WeeklyDaysProps) {
  const navigation = useNavigation();

  const { tasks, sevenDaysPeriod } = tasksData;
  const [date, month] = getDateAndMonth(sevenDaysPeriod.startDate)
    .split('.')
    .map((el) => Number(el));

  const handleOpenSingleDayTasks = ({
    day,
    currDay,
    currMonth,
    weekId,
  }: {
    day: string;
    currDay: number;
    currMonth: number;
    weekId: string;
  }) => {
    navigation.navigate(
      ...([
        'DailyTasks',
        { day, date: currDay, month: currMonth, weekId },
      ] as never),
    );
  };

  return DAYS_OF_THE_WEEK.map((day, index) => (
    <Pressable
      key={day}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
      onPress={() =>
        handleOpenSingleDayTasks({
          day,
          currDay: date + index,
          currMonth: month,
          weekId: tasksData.id,
        })
      }
    >
      <View style={styles.singleDayContainer}>
        <View>
          <Text style={styles.singleDayTitle}>
            {day}{' '}
            {`(${padToTwoDigits(+date + index)}.${padToTwoDigits(month)})`}
          </Text>
          <Text style={styles.taskStatus}>{tasks[day].length} tasks total</Text>
        </View>
        <View>
          <Text>
            {calculateTasksProgress(
              getCompletedTasksCount(tasks[day]),
              tasks[day].length,
            )}
            %
          </Text>
        </View>
      </View>
    </Pressable>
  ));
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 26,
  },
  singleDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  pressed: {
    backgroundColor: COLORS.PRIMARY_300,
    opacity: 0.75,
  },
  singleDayTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 12,
  },
});
