import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants';

export default function Fallback() {
  const navigation = useNavigation();

  console.log('to-better:navigation', navigation.navigate);

  return (
    <View style={styles.fallBackContainer}>
      <Text style={styles.fallbackHeading}>Oops!</Text>
      <Text style={styles.fallbackMessage}>Something went wrong!</Text>
      <Text style={styles.fallbackText}>
        Please try again after some time 😅
      </Text>
      <Button title="Return to home" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 26,
    rowGap: 10,
  },
  fallbackHeading: {
    fontSize: 40,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
  fallbackMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fallbackText: {
    textAlign: 'center',
  },
});
