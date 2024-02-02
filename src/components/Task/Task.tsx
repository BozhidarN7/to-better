import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
import { Task as TaskType } from '@/types/tasks';

interface TaskProps {
  taskInfo: TaskType;
}

export default function Task({ taskInfo }: TaskProps) {
  const [isTaskComplted, setIsTaskComplted] = useState(false);
  const checkButtonHandler = () => {
    setIsTaskComplted((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <View style={styles.priorityIndicator} />
      <View style={styles.taskContent}>
        <Text>{taskInfo.title}</Text>
        <Text>{taskInfo.description}</Text>
        <Text style={styles.categoryText}>{taskInfo.category}</Text>
      </View>
      <View style={styles.taskOperationsContainer}>
        <IconButton
          iconGroup={ICON_GROUPS.MaterialIcons}
          icon="edit"
          size={24}
          color={COLORS.SECONDARY_100}
          onPress={() => {}}
        />
        <IconButton
          iconGroup={ICON_GROUPS.FontAwesome}
          icon={isTaskComplted ? 'check-circle' : 'circle-thin'}
          size={24}
          color={isTaskComplted ? COLORS.COMPELTED : COLORS.SECONDARY_100}
          onPress={checkButtonHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d2d2',
  },
  taskOperationsContainer: {
    flexDirection: 'row',
    columnGap: 10,
    marginRight: 16,
  },
  priorityIndicator: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: COLORS.PRIORITY_LOW,
    marginRight: 5,
  },
  taskContent: {
    flex: 1,
    rowGap: 5,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.CATEGORY_TRAINING,
  },
});
