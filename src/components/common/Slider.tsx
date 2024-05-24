import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from './IconButton';

import { COLORS, ICON_GROUPS } from '@/constants';
import { RootState } from '@/store';
import { updateWeeksCalendarSelectedYear } from '@/store/slices/global-slice';
import { GlobalState } from '@/types';

interface SliderProps {
  data: number[];
  shouldDisableSlider: boolean;
}

export default function Slider({ data, shouldDisableSlider }: SliderProps) {
  const dispatch = useDispatch();
  const { weeksCalendarSelectedYear } = useSelector<RootState, GlobalState>(
    (state) => state.global,
  );
  const [currentIndex, setCurrentIndex] = useState(
    data.indexOf(weeksCalendarSelectedYear),
  );
  const [shouldDisableLeftButton, setShouldDisableLeftButton] = useState(
    currentIndex === 0,
  );
  const [shouldDisableRightButton, setShouldDisableRightButton] = useState(
    currentIndex === data.length - 1,
  );
  const flatListRef = useRef<FlatList>(null);

  const handleLeftButtonPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      dispatch(
        updateWeeksCalendarSelectedYear({ newYear: data[currentIndex - 1] }),
      );
      setShouldDisableRightButton(false);
    }

    if (currentIndex - 1 === 0) {
      setShouldDisableLeftButton(true);
    }
  };

  const handleRightButtonPress = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      dispatch(
        updateWeeksCalendarSelectedYear({ newYear: data[currentIndex + 1] }),
      );
      setShouldDisableLeftButton(false);
    }

    if (currentIndex + 1 === data.length - 1) {
      setShouldDisableRightButton(true);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: data.indexOf(weeksCalendarSelectedYear),
    });
  }, [data, weeksCalendarSelectedYear]);

  return (
    <View style={styles.sliderContainer}>
      <IconButton
        onPress={handleLeftButtonPress}
        size={24}
        color={COLORS.BLACK}
        iconGroup={ICON_GROUPS.FontAwesome}
        icon="angle-left"
        disabled={shouldDisableLeftButton || shouldDisableSlider}
        disabledStyles={styles.buttonDisabled}
      />

      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        onMomentumScrollEnd={(event) => {
          const index =
            event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width;
          setCurrentIndex(Math.round(index));
        }}
        getItemLayout={(data, index) => {
          return {
            length: 125,
            offset: 125 * index,
            index,
          };
        }}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <IconButton
        onPress={handleRightButtonPress}
        size={24}
        color={COLORS.BLACK}
        iconGroup={ICON_GROUPS.FontAwesome}
        icon="angle-right"
        disabled={shouldDisableRightButton || shouldDisableSlider}
        disabledStyles={styles.buttonDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  itemContainer: {
    width: 100,
    marginTop: 2,
    marginLeft: 25,
  },
  buttonDisabled: {
    opacity: 0.2,
  },
});
