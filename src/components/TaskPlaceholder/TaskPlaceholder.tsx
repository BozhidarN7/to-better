import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export default function TaskPlaceholder() {
  return (
    <View style={styles.placeholdersWrapper}>
      <View style={styles.placeholderContentContainer}>
        <ShimmerPlaceholder
          style={[styles.placeholder, styles.placeholderTitle]}
          LinearGradient={LinearGradient}
        />
        <ShimmerPlaceholder
          style={[styles.placeholder, styles.placeholderDescription]}
          LinearGradient={LinearGradient}
        />
        <ShimmerPlaceholder
          style={[styles.placeholder, styles.placeholderCategory]}
          LinearGradient={LinearGradient}
        />
      </View>
      <View style={styles.placeholderOperationsContainer}>
        <ShimmerPlaceholder
          style={styles.placeholderOperation}
          LinearGradient={LinearGradient}
        />
        <ShimmerPlaceholder
          style={styles.placeholderOperation}
          LinearGradient={LinearGradient}
        />
        <ShimmerPlaceholder
          style={styles.placeholderOperation}
          LinearGradient={LinearGradient}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholdersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  placeholder: {
    borderRadius: 10,
  },
  placeholderContentContainer: {
    flex: 1,
    rowGap: 10,
  },
  placeholderTitle: {
    width: '30%',
  },
  placeholderDescription: {
    height: 12,
    width: '70%',
  },
  placeholderCategory: {
    height: 7,
    width: '20%',
  },
  placeholderOperationsContainer: {
    flexDirection: 'row',
    columnGap: 10,
    marginRight: 16,
  },
  placeholderOperation: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
