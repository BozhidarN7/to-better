import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WeeklyDays } from '../WeeklyDays';
import { IconButton, ProgressBar } from '../common';

import { ICON_GROUPS } from '@/constants';
import { TasksState } from '@/types/tasks';
import { calculateTasksProgress, getDateAndMonth } from '@/utils';

interface WeeklyCardProps {
  tasksData: TasksState;
}

export default function WeeklyCard({ tasksData }: WeeklyCardProps) {
  const [showDays, setShowDays] = useState(false);

  const { sevenDaysPeriod, totalTasks, tasksCompleted } = tasksData;
  console.log(tasksCompleted);
  const startDate = getDateAndMonth(sevenDaysPeriod.startDate);
  const endDate = getDateAndMonth(sevenDaysPeriod.endDate);

  const handleShowDays = () => {
    setShowDays((prev) => !prev);
  };

  return (
    <View style={styles.weeklyCardContainer}>
      <View style={styles.weeklyCardHeaderContainer}>
        <View>
          <Text style={styles.weeklyCardTitle}>
            Week {startDate}/{endDate}
          </Text>
          <Text>
            {tasksCompleted} of {totalTasks} completed
          </Text>
        </View>
        <View>
          <IconButton
            iconGroup={ICON_GROUPS.FontAwesome}
            icon={showDays ? 'angle-up' : 'angle-down'}
            color="#000"
            size={24}
            onPress={handleShowDays}
          />
        </View>
      </View>
      <ProgressBar
        progress={calculateTasksProgress(tasksCompleted, totalTasks)}
      />
      {showDays ? <WeeklyDays tasksData={tasksData} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  weeklyCardContainer: {
    marginTop: 10,
  },
  weeklyCardHeaderContainer: {
    marginHorizontal: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weeklyCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
