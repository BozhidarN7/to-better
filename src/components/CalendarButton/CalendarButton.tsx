import { StyleSheet, View } from 'react-native';

import { CustomButton } from '../common';

import { COLORS, ICON_GROUPS } from '@/constants';

export default function CalendarButton() {
  return (
    <View style={styles.weeksButtonContainer}>
      <CustomButton
        text="Weeks"
        buttonStyles={styles.weeksButton}
        pressedStyles={styles.weeksButtonPressed}
        onPress={() => {}}
        icon={{
          iconGroup: ICON_GROUPS.Ionicons,
          icon: 'calendar',
          color: COLORS.PRIMARY,
          size: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  weeksButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  weeksButton: {
    width: 120,
    elevation: 4,
  },
  weeksButtonPressed: {
    opacity: 0.75,
  },
});
