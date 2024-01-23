import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants';

const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WeeklyDays() {
  const navigation = useNavigation();

  const handleOpenSingleDayTasks = (day: string) => {
    navigation.navigate(...(['DailyTasks', { day }] as never));
  };

  return daysOfTheWeek.map((day) => (
    <Pressable
      key={day}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
      onPress={() => handleOpenSingleDayTasks(day)}
    >
      <View style={styles.singleDayContainer}>
        <View>
          <Text style={styles.singleDayTitle}>{day}</Text>
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
