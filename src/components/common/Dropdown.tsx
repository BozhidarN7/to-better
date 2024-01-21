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

import { COLORS } from '@/constants';
import { DropDownOption } from '@/types';

interface DropdownProps {
  options: DropDownOption[];
  onSelect: (value: DropDownOption) => void;
  customStyles?: {
    optionTextColor: TextStyle;
    dropdownBorder: StyleProp<ViewStyle>;
  };
  defaultText: string;
}

export default function Dropdown({
  options,
  onSelect,
  customStyles,
  defaultText,
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
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <View>
      <Pressable
        style={[
          styles.pressableContainer,
          styles.dropdownBorder,
          customStyles?.dropdownBorder,
        ]}
        onPress={toggleDropdown}
      >
        <Text style={[styles.optionText, customStyles?.optionTextColor]}>
          {selectedValue ? selectedValue.label : defaultText}
        </Text>
      </Pressable>
      {isOpen && (
        <ScrollView
          style={[
            styles.optionsContainer,
            styles.dropdownBorder,
            customStyles?.dropdownBorder,
          ]}
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.optionContainer}
              onPress={() => handleSelect(option)}
            >
              <Text style={[styles.optionText, customStyles?.optionTextColor]}>
                {option.label}
              </Text>
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
  },
  dropdownBorder: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY400,
  },
  optionsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    borderRadius: 5,
  },
  optionContainer: {
    padding: 10,
  },
  optionText: {
    color: COLORS.BLACK,
  },
});
