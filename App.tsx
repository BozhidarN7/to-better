import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AllTasks } from '@/screens/AllTasks';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AllTasks" component={AllTasks} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
