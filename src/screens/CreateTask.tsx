import { useMutation } from '@apollo/client';
import { Fragment, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { CustomButton, Dropdown } from '@/components/common';
import { COLORS, ICON_GROUPS, TASK_RESTRICTIONS } from '@/constants';
import { Categories, ErrorCodes, Priorities } from '@/enums';
import { CREATE_TASK, EDIT_TASK } from '@/gql/mutations';
import { GET_WEEKS } from '@/gql/queries';
import { RootState } from '@/store';
import { selectTaskByWeekIdAndDate } from '@/store/slices/task-slice';
import { DropDownOption } from '@/types';
import { CreateTasksProps } from '@/types/navigator-types/root-stack-param-list';
import { Task } from '@/types/tasks';
import { handleGraphqlError, handleServerError } from '@/utils';

type DropdownOptionsIds = 'priority' | 'category';

const priorityOptions: DropDownOption[] = [
  {
    label: 'Low',
    value: 'low',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_LOW,
      size: 24,
    },
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_MEDIUM,
      size: 24,
    },
  },
  {
    label: 'High',
    value: 'high',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_HIGH,
      size: 24,
    },
  },
  {
    label: 'Very High',
    value: 'very high',
    icon: {
      iconGroup: ICON_GROUPS.FontAwesome,
      icon: 'circle',
      color: COLORS.PRIORITY_VERY_HIGH,
      size: 24,
    },
  },
];

const categoryOptions: DropDownOption[] = [
  {
    label: 'Home',
    value: 'home',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_HOME,
      size: 24,
    },
  },
  {
    label: 'Outdoor',
    value: 'outdoor',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_OUTDOOR,
      size: 24,
    },
  },
  {
    label: 'Shopping',
    value: 'shopping',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_SHOPPING,
      size: 24,
    },
  },
  {
    label: 'Training',
    value: 'training',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_TRAINING,
      size: 24,
    },
  },
  {
    label: 'Learning',
    value: 'learning',
    icon: {
      iconGroup: ICON_GROUPS.MaterialIcons,
      icon: 'category',
      color: COLORS.CATEGORY_LEARNING,
      size: 24,
    },
  },
];
const NUMBER_OF_DROPDOWNS = 2;

export default function CreateTask({ route, navigation }: CreateTasksProps) {
  const [createTask, { data: createTaskData, error: createTaskError }] =
    useMutation(CREATE_TASK, {
      refetchQueries: [GET_WEEKS, 'GetWeeks'],
    });
  const [editTask, { data: editTaskData, error: editTaskError }] = useMutation(
    EDIT_TASK,
    {
      refetchQueries: [GET_WEEKS, 'GetWeeks'],
    },
  );

  const { weekId, edit, day, taskId } = route.params;
  const taskToEdit =
    useSelector<RootState, Task | undefined>((state) =>
      selectTaskByWeekIdAndDate(
        state.tasks,
        weekId,
        day || 'friday',
        taskId || '',
      ),
    ) || ({} as Task);
  const [formState, setFormState] = useState({
    title: edit ? taskToEdit?.title : '',
    description: edit ? taskToEdit?.description : '',
    category: edit ? taskToEdit?.category.toLowerCase() : ('' as Categories),
    priority: edit ? taskToEdit?.priority.toLowerCase() : ('' as Priorities),
  });
  const [dropdownOpenStatuses, setDropdownOpenStatuses] = useState(
    Array(NUMBER_OF_DROPDOWNS).fill(0),
  );
  const [errors, setErrors] = useState({
    title: {
      show: false,
      message: `Title must be between ${TASK_RESTRICTIONS.MIN_TITLE_LENGTH} and ${TASK_RESTRICTIONS.MAX_TITLE_LENGTH} characters long`,
    },
    description: {
      show: false,
      message: `Description is too long. Must be less than ${TASK_RESTRICTIONS.MIN_DESCRIPTION_LENGTH} characters long`,
    },
    priority: {
      show: false,
      message: 'Please select a priority from the dropdown menu',
    },
    category: {
      show: false,
      message: 'Please select a category from the dropdown menu',
    },
  } as { [key: string]: { show: boolean; message: string } });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: edit ? 'Edit Task' : 'Create Task',
    });
  }, [edit, navigation]);

  const handleSelectPriority = (value: DropDownOption) => {
    setFormState((prev) => ({ ...prev, priority: value.value as Priorities }));
  };

  const handleSelectCategory = (value: DropDownOption) => {
    setFormState((prev) => ({ ...prev, category: value.value as Categories }));
  };

  const handleDropdowns = (index: number) => {
    setDropdownOpenStatuses((prev) => {
      return prev.map((_, i) => (i === index ? !prev[i] : false));
    });
  };

  const handleCreateTask = () => {
    const { title, description, category, priority } = formState;
    let hasError = false;
    if (
      title.length < TASK_RESTRICTIONS.MIN_TITLE_LENGTH ||
      title.length > TASK_RESTRICTIONS.MAX_TITLE_LENGTH
    ) {
      setErrors((prev) => ({
        ...prev,
        title: { ...prev.title, show: true },
      }));
      hasError = true;
    }

    if (description.length > TASK_RESTRICTIONS.MAX_DESCRIPTION_LENGTH) {
      setErrors((prev) => ({
        ...prev,
        description: { ...prev.description, show: true },
      }));
      hasError = true;
    }

    if (!priority) {
      setErrors((prev) => ({
        ...prev,
        priority: { ...prev.priority, show: true },
      }));
      hasError = true;
    }

    if (!category) {
      setErrors((prev) => ({
        ...prev,
        category: { ...prev.category, show: true },
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTask = {
      title,
      description,
      priority: priority.toUpperCase(),
      category: category.toUpperCase(),
    };

    if (edit) {
      editTask({
        variables: {
          task: { ...newTask },
          taskId: taskToEdit._id,
        },
      });
    } else {
      createTask({
        variables: {
          weekId,
          dayOfWeek: day?.toUpperCase() || 'FRIDAY',
          task: newTask,
        },
      });
    }
    navigation.goBack();
  };

  const allDropdowns = [
    {
      id: 'priority' as DropdownOptionsIds,
      options: priorityOptions,
      onSelect: handleSelectPriority,
      defaultText: 'Select task priority',
      customStyles: {
        styles: styles.dropdownCustomStyles,
        optionTextColor: styles.dropdownOptionTextColor,
      },
    },
    {
      id: 'category' as DropdownOptionsIds,
      options: categoryOptions,
      onSelect: handleSelectCategory,
      defaultText: 'Select task category',
      customStyles: {
        styles: styles.dropdownCustomStyles,
        optionTextColor: styles.dropdownOptionTextColor,
      },
    },
  ];

  useMemo(
    () =>
      handleGraphqlError([
        { error: createTaskError, errorCode: ErrorCodes.DeleteTask },
        {
          error: editTaskError,
          errorCode: ErrorCodes.UpdateTotalTasksCompleted,
        },
      ]),
    [createTaskError, editTaskError],
  );

  useMemo(() => {
    handleServerError([
      { ...createTaskData?.createTask },
      { ...editTaskData?.editTask },
    ]);
  }, [createTaskData?.createTask, editTaskData?.editTask]);

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={COLORS.SECONDARY_300}
          value={formState.title}
          onChangeText={(value) =>
            setFormState((prev) => ({ ...prev, title: value }))
          }
        />
        {errors.title.show && (
          <Text style={styles.errorText}>{errors.title.message}</Text>
        )}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          placeholder="Description"
          placeholderTextColor={COLORS.SECONDARY_300}
          value={formState.description}
          onChangeText={(value) =>
            setFormState((prev) => ({ ...prev, description: value }))
          }
        />
        {errors.description.show && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}
        {allDropdowns.map((dropdownOptions, index) => (
          <Fragment key={dropdownOptions.id}>
            <Dropdown
              index={index}
              options={dropdownOptions.options}
              defaultText={dropdownOptions.defaultText}
              customStyles={dropdownOptions.customStyles}
              onSelect={dropdownOptions.onSelect}
              outerIsOpen={dropdownOpenStatuses[index]}
              handleOuterIsOpen={handleDropdowns}
              chosenValue={formState[dropdownOptions.id]}
            />
            {errors[dropdownOptions.id].show && (
              <Text style={styles.errorText}>
                {errors[dropdownOptions.id].message}
              </Text>
            )}
          </Fragment>
        ))}
        <CustomButton
          buttonStyles={styles.addButton}
          pressedStyles={styles.addButtonPressed}
          text={edit ? 'Edit' : 'Add'}
          onPress={handleCreateTask}
        />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY_300,
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  multilineInput: {
    height: 80,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 12,
    marginTop: -10,
  },
  dropdownOptionTextColor: {
    color: COLORS.SECONDARY_300,
  },
  dropdownCustomStyles: {
    borderColor: COLORS.SECONDARY_300,
    marginVertical: 15,
  },
  addButton: {
    backgroundColor: COLORS.ACCENT_300,
    borderColor: COLORS.PRIMARY,
    marginTop: 15,
  },
  addButtonPressed: {
    opacity: 0.75,
  },
});
