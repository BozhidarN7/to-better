import { StyleSheet, TextInput, View } from 'react-native';

import { Dropdown } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';
import { DropDownOption } from '@/types';

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

export default function CreateTask() {
  const handleSelect = (value: DropDownOption) => {
    console.log(`Selected value: ${value.label}`);
  };
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={COLORS.SECONDARY_300}
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        multiline
        placeholder="Description"
        placeholderTextColor={COLORS.SECONDARY_300}
      />
      <Dropdown
        options={priorityOptions}
        onSelect={handleSelect}
        defaultText="Select task priority"
        customStyles={{
          styles: styles.dropdownCustomStyles,
          optionTextColor: styles.dropdownOptionTextColor,
        }}
      />
      <Dropdown
        options={categoryOptions}
        onSelect={handleSelect}
        defaultText="Select task category"
        customStyles={{
          styles: styles.dropdownCustomStyles,
          optionTextColor: styles.dropdownOptionTextColor,
        }}
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
});
