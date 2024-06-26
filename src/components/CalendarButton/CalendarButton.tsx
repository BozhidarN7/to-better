import { useMutation } from '@apollo/client';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CustomButton, IconButton, Slider } from '../common';

import { COLORS, ICON_GROUPS } from '@/constants';
import { ErrorCodes } from '@/enums';
import { SELECT_WEEK_BY_SEVEN_DAYS_PERIOD } from '@/gql/mutations';
import { GET_WEEKS } from '@/gql/queries';
import { RootState } from '@/store';
import { updateTotalTasksSelected } from '@/store/slices/task-slice';
import { GlobalState } from '@/types';
import { SevenDaysPeriod, TasksState } from '@/types/tasks';
import {
  converDateToString,
  determinePastAndFutureYears,
  getDateAndMonth,
  handleGraphqlError,
} from '@/utils';

export default function CalendarButton() {
  const disatch = useDispatch();
  const [
    selectWeek,
    {
      loading: selectWeeksBySevenDaysPeriodLoading,
      error: selectWeeksBySevenDaysPeriodError,
    },
  ] = useMutation(SELECT_WEEK_BY_SEVEN_DAYS_PERIOD, {
    refetchQueries: [GET_WEEKS, 'GetWeeks'],
    awaitRefetchQueries: true,
  });
  const [shouldShowCalendarModal, setShouldShowCalendarModal] = useState(false);
  const weeksState = useSelector<RootState, TasksState>((state) => state.tasks);
  const { weeksCalendarSelectedYear, firstYearWithTasks } = useSelector<
    RootState,
    GlobalState
  >((state) => state.global);

  const calculateWeeksDates = (year: number, weekNumber: number) => {
    const firstDayOfYear = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const dayOfWeek = firstDayOfYear.getDay();
    const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;

    const startDate = new Date(
      firstDayOfYear.getTime() + daysToAdd * 24 * 3600 * 1000,
    );
    const endDate = new Date(startDate.getTime() + 6 * 24 * 3600 * 1000);

    return {
      startDate: converDateToString(startDate),
      endDate: converDateToString(endDate),
    };
  };

  const generateWeeks = (year: number) => {
    const weeks = [];

    for (let weekNumber = 1; weekNumber <= 53; weekNumber++) {
      const weekDates = calculateWeeksDates(year, weekNumber);

      if (weekNumber === 53 && Number(weekDates.startDate.split('.')[0]) < 20) {
        continue;
      }

      weeks.push({
        startDate: weekDates.startDate,
        endDate: weekDates.endDate,
      });
    }

    return weeks;
  };

  const checkIfWeekIsSelected = (sevenDaysPeriod: SevenDaysPeriod) => {
    return weeksState.weeks.find(
      (week) =>
        week.sevenDaysPeriod.startDate === sevenDaysPeriod.startDate &&
        week.sevenDaysPeriod.endDate === sevenDaysPeriod.endDate,
    )?.isSelected;
  };

  const handleSelectWeek = (item: SevenDaysPeriod) => {
    const isSelected = checkIfWeekIsSelected(item);
    selectWeek({
      variables: {
        sevenDaysPeriod: {
          startDate: item.startDate,
          endDate: item.endDate,
        },
        isSelected: !isSelected,
      },
    });
    disatch(updateTotalTasksSelected({ shouldIncrease: !isSelected }));
  };

  const weeks = generateWeeks(weeksCalendarSelectedYear);

  useMemo(() => {
    handleGraphqlError([
      {
        error: selectWeeksBySevenDaysPeriodError,
        errorCode: ErrorCodes.WeekSelectionError,
      },
    ]);
  }, [selectWeeksBySevenDaysPeriodError]);

  return (
    <>
      <View style={styles.weeksButtonContainer}>
        <CustomButton
          text="Weeks"
          buttonStyles={styles.weeksButton}
          pressedStyles={styles.weeksButtonPressed}
          onPress={() => {
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
            <TouchableWithoutFeedback>
              <View style={styles.calendarModalContent}>
                <ActivityIndicator
                  animating={selectWeeksBySevenDaysPeriodLoading}
                  size={30}
                  color={COLORS.SECONDARY_100}
                />
                <Text style={styles.weeksHeader}>Select weeks:</Text>
                <View
                  style={[
                    styles.yearsSliderContainer,
                    selectWeeksBySevenDaysPeriodLoading && styles.fetching,
                  ]}
                >
                  <Slider
                    data={determinePastAndFutureYears(firstYearWithTasks)}
                    shouldDisableSlider={selectWeeksBySevenDaysPeriodLoading}
                  />
                </View>
                <FlatList
                  style={[
                    styles.weeksList,
                    selectWeeksBySevenDaysPeriodLoading && styles.fetching,
                  ]}
                  data={weeks}
                  keyExtractor={(item) => item.startDate}
                  renderItem={(item) => {
                    const { startDate, endDate } = item.item;
                    const isWeekSelected = checkIfWeekIsSelected(item.item);
                    const week = `${getDateAndMonth(startDate)}/${getDateAndMonth(endDate)}`;
                    return (
                      <TouchableWithoutFeedback>
                        <View style={styles.weekItemContainer}>
                          <IconButton
                            icon={
                              isWeekSelected
                                ? 'check-box'
                                : 'check-box-outline-blank'
                            }
                            iconGroup={ICON_GROUPS.MaterialIcons}
                            color={
                              isWeekSelected ? COLORS.COMPELTED : COLORS.BLACK
                            }
                            size={24}
                            disabled={selectWeeksBySevenDaysPeriodLoading}
                            onPress={() => handleSelectWeek(item.item)}
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
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingTop: 10,
    paddingBottom: 40,
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
  fetching: {
    opacity: 0.4,
  },
  weeksHeader: {},
  yearsSliderContainer: {
    height: 20,
    marginVertical: 10,
  },
  weeksList: {},
  weekItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    marginVertical: 1,
  },
});
