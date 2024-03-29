import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, DAYS_OF_THE_WEEK } from '@/constants';
import { Week } from '@/types/tasks';
import {
  calculateTasksProgress,
  getCompletedTasksCount,
  isToday,
  padToTwoDigits,
} from '@/utils';

interface WeeklyDaysProps {
  tasksData: Week;
}

export default function WeeklyDays({ tasksData }: WeeklyDaysProps) {
  const navigation = useNavigation();

  const { tasks, sevenDaysPeriod } = tasksData;
  const [date, month, year] = sevenDaysPeriod.startDate
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
      style={({ pressed }) => [
        styles.root,
        isToday(new Date(year, month - 1, date + index)) && styles.today,
        pressed && styles.pressed,
      ]}
      onPress={() =>
        handleOpenSingleDayTasks({
          day,
          currDay: date + index,
          currMonth: month,
          weekId: tasksData._id,
        })
      }
    >
      <View style={[styles.singleDayContainer]}>
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
  today: {
    backgroundColor: COLORS.SECONDARY_25,
  },
});
