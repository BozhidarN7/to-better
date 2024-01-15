import { StyleSheet, View } from 'react-native';

import { COLORS } from '@/constants';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: COLORS.GREY_100,
    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 10,
    backgroundColor: COLORS.COMPELTED,
    borderRadius: 10,
  },
});
