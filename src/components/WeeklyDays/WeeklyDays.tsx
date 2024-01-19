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

  return (
    <View>
      {daysOfTheWeek.map((day) => (
        <Pressable
          key={day}
          style={({ pressed }) => [
            styles.singleDayContainer,
            pressed && styles.pressed,
          ]}
          onPress={() => handleOpenSingleDayTasks.bind(null, day)}
        >
          <View>
            <Text style={styles.singleDayTitle}>{day}</Text>
            <Text style={styles.taskStatus}>14 tasks total</Text>
          </View>
          <View>
            <Text>98%</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  singleDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  pressed: {
    backgroundColor: COLORS.PRIMARY300,
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
