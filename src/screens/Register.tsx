import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '@/constants';

export default function Register() {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.primaryHeader}>Create account</Text>
      <Text style={styles.secondaryHeader}>Please enter your details</Text>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputLabel} aria-label="Email">
          Your email
        </Text>
        <TextInput
          style={styles.inputField}
          aria-label="input"
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputLabel} aria-label="Password">
          Password
        </Text>
        <TextInput
          style={styles.inputField}
          aria-label="input"
          placeholder="Enter your password"
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputLabel} aria-label="Repeat password">
          Repeat password
        </Text>
        <TextInput
          style={styles.inputField}
          aria-label="input"
          placeholder="Repeat password"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    padding: 20,
  },
  primaryHeader: {
    fontSize: 24,
    color: COLORS.ACCENT_300,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secondaryHeader: {
    fontSize: 15,
    marginBottom: 20,
  },
  inputFieldContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: COLORS.PRIMARY_100,
    height: 40,
    borderRadius: 6,
    paddingLeft: 15,
  },
});
