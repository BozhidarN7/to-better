import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CustomButton } from '../common';

import { COLORS, ICON_GROUPS } from '@/constants';

export default function CalendarButton() {
  const [shouldShowCalendarModal, setShouldShowCalendarModal] = useState(false);
  console.log('to-better:shouldShowModal', shouldShowCalendarModal);
  return (
    <>
      <View style={styles.weeksButtonContainer}>
        <CustomButton
          text="Weeks"
          buttonStyles={styles.weeksButton}
          pressedStyles={styles.weeksButtonPressed}
          onPress={() => {
            console.log('hre');
            setShouldShowCalendarModal((prev) => !prev);
          }}
          icon={{
            iconGroup: ICON_GROUPS.Ionicons,
            icon: 'calendar',
            color: COLORS.PRIMARY,
            size: 24,
          }}
        />
      </View>
      <Modal animationType="fade" transparent visible={shouldShowCalendarModal}>
        <TouchableWithoutFeedback
          onPress={() => setShouldShowCalendarModal(false)}
        >
          <View style={styles.calendarModalContainer}>
            <View style={styles.calendarModalContent}>
              <Text>This is a modal window</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
