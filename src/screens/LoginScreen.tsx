import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { CustomButton, Input } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';

export default function LoginScreen() {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.primaryHeader}>Log in</Text>
      <Text style={styles.secondaryHeader}>
        Enter your email and password to use the app
      </Text>
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
      <View style={styles.authActionsContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            color={COLORS.SECONDARY_100}
            value
            onValueChange={() => {}}
          />
          <Text>Rembmer me</Text>
        </View>
        <Text>Forget Password!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <LinearGradient
          style={[styles.linearGradient, styles.button]}
          colors={[COLORS.ACCENT_300, COLORS.SECONDARY_50]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <CustomButton
            buttonStyles={[styles.button, styles.registerButton]}
            text="Login"
            onPress={() => {}}
          />
        </LinearGradient>
        <Text>Don&apos;t have an account? Create one!</Text>
        <CustomButton
          buttonStyles={[styles.button, styles.loginButton]}
          text="Register"
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
  authActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
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
