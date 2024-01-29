import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Task } from '@/components/Task';
import { IconButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
import { DailyTasksProps } from '@/types/navigator-types/root-stack-param-list';
import { padToTwoDigits } from '@/utils';

export default function DailyTasks({ route, navigation }: DailyTasksProps) {
  const { day, date, month } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${day} (${padToTwoDigits(date)}.${padToTwoDigits(month)})`,
      headerRight: () => <Text style={styles.headerRightStyles}>98%</Text>,
    });
  }, [date, day, month, navigation]);

  return (
    <>
      <ScrollView>
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <Task key={index} />
          ))}
      </ScrollView>
      <View style={styles.addButtonContainer}>
        <IconButton
          iconGroup={ICON_GROUPS.Ionicons}
          icon="add-circle"
          color={COLORS.SECONDARY_300}
          size={56}
          onPress={() => {
            navigation.navigate(...(['CreateTasks', { date, month }] as never));
          }}
          stylesOnPressed={styles.addButtonPressed}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerRightStyles: {
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonPressed: {
    opacity: 0.75,
  },
});
