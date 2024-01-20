import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WeeklyDays } from '../WeeklyDays';
import { IconButton, ProgressBar } from '../common';

export default function WeeklyCard() {
  const [showDays, setShowDays] = useState(false);

  const handleShowDays = () => {
    setShowDays((prev) => !prev);
  };

  return (
    <View style={styles.weeklyCardContainer}>
      <View style={styles.weeklyCardHeaderContainer}>
        <View>
          <Text style={styles.weeklyCardTitle}>Week 15.01/21.01</Text>
          <Text>10 of 20 completed</Text>
        </View>
        <View>
          <IconButton
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
