import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function WeeklyCardPlaceholder() {
  const placeholders = [0, 1, 2];
  return placeholders.map((id) => (
    <View style={styles.ShimmerPlaceholderWrappe} key={id}>
      <ShimmerPlaceHolder
        style={[styles.shimmerPlaceHolder]}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        style={[styles.shimmerPlaceHolder, styles.shimmerPlaceHolderSubtitle]}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceHolder
        style={[
          styles.shimmerPlaceHolder,
          styles.shimmerPlaceholderProgressBar,
        ]}
        LinearGradient={LinearGradient}
      />
    </View>
  ));
}

const styles = StyleSheet.create({
  ShimmerPlaceholderWrappe: {
    marginVertical: 10,
    marginHorizontal: 26,
    rowGap: 12,
  },
  shimmerPlaceHolder: {
    borderRadius: 10,
  },
  shimmerPlaceHolderSubtitle: {
    height: 10,
  },
  shimmerPlaceholderProgressBar: {
    width: '100%',
    height: 12,
  },
});
