import { ScrollView, StyleSheet } from 'react-native';

import { WeeklyCard } from '@/components/WeeklyCard';

export default function AllTasks() {
  return (
    <ScrollView style={styles.allTasksContainer}>
      <WeeklyCard />
      <WeeklyCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allTasksContainer: {
    flex: 1,
  },
});
