import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { CustomButton, Input } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';

export default function Register() {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.primaryHeader}>Create account</Text>
      <Text style={styles.secondaryHeader}>Please enter your details</Text>
      <Input
        labelText="Your email"
        placeholder="Enter your email"
        icon={{
          icon: 'envelope-o',
          iconGroup: ICON_GROUPS.FontAwesome,
          color: COLORS.BLACK,
          size: 22,
        }}
      />
      <Input
        labelText="Password"
        placeholder="Enter your password"
        icon={{
          icon: true ? 'eye-outline' : 'eye-off-outline',
          iconGroup: ICON_GROUPS.Ionicons,
          color: COLORS.BLACK,
          size: 24,
        }}
      />
      <Input
        labelText="Repeat password"
        placeholder="Repeat password"
        icon={{
          icon: false ? 'eye-outline' : 'eye-off-outline',
          iconGroup: ICON_GROUPS.Ionicons,
          color: COLORS.BLACK,
          size: 24,
        }}
      />
      <View style={styles.buttonsContainer}>
        <LinearGradient
          style={[styles.linearGradient, styles.button]}
          colors={[COLORS.ACCENT_300, COLORS.SECONDARY_50]}
          start={[0, 0]}
          end={[1, 1]}
        >
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
  buttonsContainer: {
    marginTop: 20,
    rowGap: 15,
    alignItems: 'center',
  },
  linearGradient: {
    elevation: 4,
  },
  button: {
    borderRadius: 7,
    width: '100%',
    borderColor: COLORS.PRIMARY,
  },
  registerButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  loginButton: {
    backgroundColor: COLORS.ACCENT_100,
  },
});
