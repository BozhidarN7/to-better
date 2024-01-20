import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from '@/constants';
import { AllTasks, DailyTasks } from '@/screens';
import { RootStackParamList } from '@/types/navigator-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AllTasks"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.SECONDARY_100 },
            headerTintColor: COLORS.PRIMARY,
          }}
        >
          <Stack.Screen
            name="AllTasks"
            component={AllTasks}
            options={{
              title: 'All Tasks',
            }}
          />
          <Stack.Screen
            name="DailyTasks"
            component={DailyTasks}
            initialParams={{ day: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
