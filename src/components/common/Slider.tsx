import React, { useState, useRef } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import IconButton from './IconButton';

import { COLORS, ICON_GROUPS } from '@/constants';

interface SliderProps {
  data: number[];
}

export default function Slider({ data }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleLeftButtonPress = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex - 1,
      });
    }
  };

  const handleRightButtonPress = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
    }
  };

  return (
    <View style={styles.sliderContainer}>
      <IconButton
        onPress={handleLeftButtonPress}
        size={24}
        color={COLORS.BLACK}
        iconGroup={ICON_GROUPS.FontAwesome}
        icon="angle-left"
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
});
