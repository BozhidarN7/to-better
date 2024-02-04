import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { IconButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
import {
  updateTaskCompletionStatus,
  updateTotalTasksCompleted,
} from '@/store/slices/task-slice';
import { DayOfWeek } from '@/types';
import { Task as TaskType } from '@/types/tasks';
import { getTaskCategoryColor, getTaskPriorityColor } from '@/utils';

interface TaskProps {
  taskInfo: TaskType;
  weekId: string;
  day: string;
}

export default function Task({ taskInfo, weekId, day }: TaskProps) {
  const dispatch = useDispatch();
  const [isTaskComplted, setIsTaskComplted] = useState(taskInfo.isCompleted);

  const checkButtonHandler = () => {
    setIsTaskComplted((prev) => {
      const newValue = !prev;
      dispatch(updateTotalTasksCompleted({ weekId, increase: newValue }));
      dispatch(
        updateTaskCompletionStatus({
          weekId,
          day: day as DayOfWeek,
          taskId: taskInfo.id,
        }),
      );
      return newValue;
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.priorityIndicator,
          { borderColor: getTaskPriorityColor(taskInfo.priority) },
        ]}
      />
      <View style={styles.taskContent}>
        <Text>{taskInfo.title}</Text>
        <Text>{taskInfo.description}</Text>
        <Text
          style={[
            styles.categoryText,
            { color: getTaskCategoryColor(taskInfo.category) },
          ]}
        >
          {taskInfo.category}
        </Text>
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
    marginRight: 5,
  },
  taskContent: {
    flex: 1,
    rowGap: 5,
  },
  categoryText: {
    fontSize: 12,
  },
});
