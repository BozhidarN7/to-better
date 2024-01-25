import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WeeklyDays } from '../WeeklyDays';
import { IconButton, ProgressBar } from '../common';

import { ICON_GROUPS } from '@/constants';
import { TasksState } from '@/types/tasks';
import { getDateAndMonth } from '@/utils';

interface WeeklyCardProps {
  tasksData: TasksState;
}

export default function WeeklyCard({ tasksData }: WeeklyCardProps) {
  const [showDays, setShowDays] = useState(false);

  const startDate = getDateAndMonth(tasksData.sevenDaysPeriod.startDate);
  const endDate = getDateAndMonth(tasksData.sevenDaysPeriod.endDate);

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
          <Text>10 of 20 completed</Text>
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
      <ProgressBar progress={50} />
      {showDays ? <WeeklyDays /> : null}
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
