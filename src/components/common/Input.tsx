import { StyleSheet, Text, TextInput, View } from 'react-native';

import Icon, { IconProps } from './Icon';

import { COLORS } from '@/constants';

interface InputProps {
  labelText: string;
  placeholder: string;
  icon?: IconProps;
}

export default function Input({ labelText, placeholder, icon }: InputProps) {
  return (
    <View style={styles.inputGroupContainer}>
      <Text style={styles.inputLabel} aria-label={labelText}>
        {labelText}
      </Text>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.inputField}
          aria-label="input"
          placeholder={placeholder}
        />
        {icon ? (
          <Icon
            iconGroup={icon.iconGroup}
            icon={icon.icon}
            color={icon.color}
            size={icon.size}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroupContainer: {
    marginBottom: 15,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_100,
    borderRadius: 6,
    paddingRight: 15,
  },
  inputLabel: {
    marginBottom: 8,
  },
  inputField: {
    flex: 1,
    height: 40,
    paddingLeft: 15,
  },
});
