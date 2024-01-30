import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { CustomButton, Dropdown } from '@/components/common';
import { COLORS, ICON_GROUPS, TASK_RESTRICTIONS } from '@/constants';
import { Categories, Priorities } from '@/enums';
import { createTask } from '@/store/slices/task-slice';
import { DropDownOption } from '@/types';
import { CreateTasksProps } from '@/types/navigator-types/root-stack-param-list';
import { Task } from '@/types/tasks';

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

export default function CreateTask({ route }: CreateTasksProps) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: Categories.Home,
    priority: Priorities.Low,
  });
  const { date, month } = route.params;

  const handleSelectPriority = (value: DropDownOption) => {
    setFormState((prev) => ({ ...prev, priority: value.value as Priorities }));
  };

  const handleSelectCategory = (value: DropDownOption) => {
    setFormState((prev) => ({ ...prev, category: value.value as Categories }));
  };

  const handleCreateTask = () => {
    const { title, description, category, priority } = formState;
    if (
      title.length < TASK_RESTRICTIONS.MIN_TITLE_LENGTH ||
      title.length > TASK_RESTRICTIONS.MAX_TITLE_LENGTH
    ) {
      return;
    }

    if (description.length > TASK_RESTRICTIONS.MAX_DESCRIPTION_LENGTH) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
      description,
      priority,
      category,
      isCompleted: false,
    };
    dispatch(createTask(newTask));
  };

  return (
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
      <TextInput
        style={[styles.input, styles.multilineInput]}
        multiline
        placeholder="Description"
        placeholderTextColor={COLORS.SECONDARY_300}
        onChangeText={(value) =>
          setFormState((prev) => ({ ...prev, description: value }))
        }
      />
      <Dropdown
        options={priorityOptions}
        onSelect={handleSelectPriority}
        defaultText="Select task priority"
        customStyles={{
          styles: styles.dropdownCustomStyles,
          optionTextColor: styles.dropdownOptionTextColor,
        }}
      />
      <Dropdown
        options={categoryOptions}
        onSelect={handleSelectCategory}
        defaultText="Select task category"
        customStyles={{
          styles: styles.dropdownCustomStyles,
          optionTextColor: styles.dropdownOptionTextColor,
        }}
      />
      <CustomButton
        buttonStyles={styles.addButton}
        pressedStyles={styles.addButtonPressed}
        text="Add"
        onPress={handleCreateTask}
      />
    </View>
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
  },
  addButtonPressed: {
    opacity: 0.75,
  },
});
