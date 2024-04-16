import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CustomButton, IconButton } from '../common';

import { COLORS, ICON_GROUPS } from '@/constants';

export default function CalendarButton() {
  const [shouldShowCalendarModal, setShouldShowCalendarModal] = useState(false);

  const calculateWeeksDates = (year: number, weekNumber: number) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const firstDayOfWeek = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const dayIndex = firstDayOfWeek.getDay();
    console.log(daysOfWeek[dayIndex]);

    const startDate = firstDayOfWeek.toISOString().split('T')[0];
    const endDate = new Date(firstDayOfWeek.getTime() + 6 * 24 * 3600 * 1000)
      .toISOString()
      .split('T')[0];

    return { startDate, endDate };
  };

  const generateWeeks = (year: number) => {
    const weeks = [];
    for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
      const weekDates = calculateWeeksDates(year, weekNumber);

      weeks.push({
        startDate: weekDates.startDate,
        endDate: weekDates.endDate,
      });
    }
    return weeks;
  };

  const weeks = generateWeeks(2024);
  console.log(weeks);
  console.log('----------------------');

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
          onPress={() => setShouldShowCalendarModal(true)}
        >
          <View style={styles.calendarModalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarModalContent}>
                <Text style={styles.weeksHeader}>Select weeks:</Text>
                <FlatList
                  style={styles.weeksList}
                  data={weeks}
                  keyExtractor={(item) => item.startDate}
                  renderItem={(item) => {
                    const { startDate, endDate } = item.item;
                    const week = `${startDate} - ${endDate}`;
                    return (
                      <TouchableWithoutFeedback>
                        <View style={styles.weekItemContainer}>
                          <IconButton
                            icon="check-box-outline-blank"
                            iconGroup={ICON_GROUPS.MaterialIcons}
                            color={COLORS.BLACK}
                            size={24}
                            onPress={() => {}}
                          />
                          <Text>Week {week}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
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
    height: 250,
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
  weeksHeader: {},
  weeksList: {},
  weekItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    marginVertical: 1,
  },
});
