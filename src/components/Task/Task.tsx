import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { IconButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
import {
  deleteTask,
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
  date: number;
}

export default function Task({ taskInfo, weekId, day, date }: TaskProps) {
  const navigation = useNavigation();
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

  const handleDeleteTask = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(
              deleteTask({
                weekId,
                day: day as DayOfWeek,
                taskId: taskInfo.id,
              }),
            );
          },
        },
      ],
      { cancelable: true },
    );
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
        <Text style={styles.titleText}>{taskInfo.title}</Text>
        <Text style={styles.descriptionText}>{taskInfo.description}</Text>
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
          iconGroup={ICON_GROUPS.FontAwesome}
          icon={isTaskComplted ? 'check-circle' : 'circle-thin'}
          size={24}
          color={isTaskComplted ? COLORS.COMPELTED : COLORS.SECONDARY_100}
          onPress={checkButtonHandler}
        />
        <IconButton
          iconGroup={ICON_GROUPS.MaterialIcons}
          icon="edit"
          size={24}
          color={COLORS.SECONDARY_100}
          onPress={() =>
            navigation.navigate(
              ...([
                'CreateTasks',
                { date, weekId, day, taskId: taskInfo.id, edit: true },
              ] as never),
            )
          }
        />
        <IconButton
          iconGroup={ICON_GROUPS.MaterialIcons}
          icon="delete"
          size={24}
          color={COLORS.ERROR}
          onPress={handleDeleteTask}
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
    marginRight: 10,
  },
  descriptionText: {
    textAlign: 'justify',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 12,
  },
});
