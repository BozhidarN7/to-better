import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import IconButton from './IconButton';

import { COLORS } from '@/constants';
import { DropDownOption } from '@/types';

interface DropdownProps {
  options: DropDownOption[];
  onSelect: (value: DropDownOption) => void;
  customStyles?: {
    optionTextColor: TextStyle;
    styles: StyleProp<ViewStyle>;
  };
  defaultText: string;
  outerIsOpen?: boolean;
  handleOuterIsOpen?: (index: number) => void;
  index: number;
}

export default function Dropdown({
  options,
  onSelect,
  customStyles,
  defaultText,
  index,
  outerIsOpen,
  handleOuterIsOpen,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropDownOption | null>(
    null,
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: DropDownOption) => {
    setSelectedValue(value);
    onSelect(value);
    return handleOuterIsOpen ? handleOuterIsOpen(index) : toggleDropdown();
  };

  const renderIcon = (option: DropDownOption | null) => {
    return option && option.icon ? (
      <IconButton
        iconGroup={option.icon.iconGroup}
        icon={option.icon.icon}
        color={option.icon.color}
        size={option.icon.size}
        onPress={() => {}}
      />
    ) : null;
  };

  const showOptions = outerIsOpen ? outerIsOpen : isOpen;

  return (
    <View>
      <Pressable
        style={[
          styles.pressableContainer,
          styles.dropdownBorder,
          customStyles?.styles,
        ]}
        onPress={() => {
          return handleOuterIsOpen
            ? handleOuterIsOpen(index)
            : toggleDropdown();
        }}
      >
        <Text style={[styles.optionText, customStyles?.optionTextColor]}>
          {selectedValue ? selectedValue.label : defaultText}
        </Text>
        {renderIcon(selectedValue)}
      </Pressable>
      {showOptions && (
        <ScrollView
          style={[
            styles.optionsContainer,
            styles.dropdownBorder,
            customStyles?.styles,
          ]}
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.optionContainer}
              onPress={() => handleSelect(option)}
            >
              <Text style={[styles.optionText]}>{option.label}</Text>
              {renderIcon(option)}
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBorder: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_400,
  },
  optionsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY_50,
    zIndex: 2,
  },
  optionContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: COLORS.BLACK,
  },
});
