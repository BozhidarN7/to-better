import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/components/common';
import { COLORS, ICON_GROUPS } from '@/constants';

export default function Task() {
  const [isTaskComplted, setIsTaskComplted] = useState(false);
  const checkButtonHandler = () => {
    setIsTaskComplted((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <View style={styles.checkButtonContainer}>
        <IconButton
          iconGroup={ICON_GROUPS.FontAwesome}
          icon={isTaskComplted ? 'check-circle' : 'circle-thin'}
          size={24}
          color={isTaskComplted ? COLORS.COMPELTED : COLORS.SECONDARY_100}
          onPress={checkButtonHandler}
        />
      </View>
      <View style={styles.taskContent}>
        <Text>TITLE</Text>
        <Text>DESCRIPTION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d2d2',
  },
  checkButtonContainer: {
    marginHorizontal: 16,
  },
  taskContent: {},
});
