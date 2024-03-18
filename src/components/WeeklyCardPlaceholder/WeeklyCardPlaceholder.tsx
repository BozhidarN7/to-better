import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function WeeklyCardPlaceholder() {
  return (
    <>
      <ShimmerPlaceHolder LinearGradient={LinearGradient} />
      <ShimmerPlaceHolder visible LinearGradient={LinearGradient}>
        <Text>Wow, awesome here.</Text>
      </ShimmerPlaceHolder>
    </>
  );
}
