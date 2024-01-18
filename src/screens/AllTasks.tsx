import { StyleSheet, View } from 'react-native';

import { WeeklyCard } from '@/components/WeeklyCard';

export default function AllTasks() {
  return (
    <View style={styles.allTasksContainer}>
      <WeeklyCard />
      <WeeklyCard />
    </View>
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
