import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { CustomButton, Icon } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';

export default function Register() {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.primaryHeader}>Create account</Text>
      <Text style={styles.secondaryHeader}>Please enter your details</Text>
      <View style={styles.inputGroupContainer}>
        <Text style={styles.inputLabel} aria-label="Email">
          Your email
        </Text>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            aria-label="input"
            placeholder="Enter your email"
          />
          <Icon
            iconGroup={ICON_GROUPS.FontAwesome}
            icon="envelope-o"
            color={COLORS.BLACK}
            size={22}
          />
        </View>
      </View>
      <View style={styles.inputGroupContainer}>
        <Text style={styles.inputLabel} aria-label="Password">
          Password
        </Text>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            aria-label="input"
            placeholder="Enter your password"
          />
          <Icon
            iconGroup={ICON_GROUPS.Ionicons}
            icon={true ? 'eye-outline' : 'eye-off-outline'}
            color={COLORS.BLACK}
            size={24}
          />
        </View>
      </View>
      <View style={styles.inputGroupContainer}>
        <Text style={styles.inputLabel} aria-label="Repeat password">
          Repeat password
        </Text>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            aria-label="input"
            placeholder="Repeat password"
          />
          <Icon
            iconGroup={ICON_GROUPS.Ionicons}
            icon={false ? 'eye-outline' : 'eye-off-outline'}
            color={COLORS.BLACK}
            size={24}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <LinearGradient colors={[COLORS.ACCENT_100, COLORS.ACCENT_300]}>
          <CustomButton
            buttonStyles={[styles.button, styles.registerButton]}
            text="Register"
            onPress={() => {}}
          />
        </LinearGradient>
        <Text>Already have an account?</Text>
        <CustomButton
          buttonStyles={[styles.button, styles.loginButton]}
          text="Login"
          onPress={() => {}}
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
  buttonsContainer: {
    marginTop: 20,
    rowGap: 15,
    alignItems: 'center',
  },
  button: {
    borderRadius: 7,
    width: '100%',
    borderColor: COLORS.PRIMARY,
  },
  registerButton: {
    backgroundColor: COLORS.ACCENT_300,
  },
  loginButton: {
    backgroundColor: COLORS.ACCENT_100,
  },
});
