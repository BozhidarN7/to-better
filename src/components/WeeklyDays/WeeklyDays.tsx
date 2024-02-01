import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants';
import { TasksState } from '@/types/tasks';
import { getDateAndMonth, padToTwoDigits } from '@/utils';

interface WeeklyDaysProps {
  tasksData: TasksState;
}

const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WeeklyDays({ tasksData }: WeeklyDaysProps) {
  const navigation = useNavigation();
  console.log('taskData', tasksData);

  const [date, month] = getDateAndMonth(tasksData.sevenDaysPeriod.startDate)
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

  return daysOfTheWeek.map((day, index) => (
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
          <Text style={styles.taskStatus}>14 tasks total</Text>
        </View>
        <View>
          <Text>98%</Text>
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
    fontSize: 16,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 12,
  },
});
