import { StyleSheet, Text, View } from 'react-native';

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
  return (
    <View>
      {daysOfTheWeek.map((day) => (
        <View key={day} style={styles.singleDayContainer}>
          <View>
            <Text style={styles.singleDayTitle}>{day}</Text>
            <Text style={styles.taskStatus}>14 tasks total</Text>
          </View>
          <View>
            <Text>98%</Text>
          </View>
        </View>
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
  singleDayTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 12,
  },
});
