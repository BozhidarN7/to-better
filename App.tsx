import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { COLORS } from '@/constants';
import { AllTasks, DailyTasks } from '@/screens';
import CreateTask from '@/screens/CreateTask';
import store from '@/store';
import { RootStackParamList } from '@/types/navigator-types';
import { createDate } from '@/utils';

const Stack = createNativeStackNavigator<RootStackParamList>();
console.log(createDate('9/01/2024'));
export default function App() {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
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
            <Stack.Screen
              name="CreateTasks"
              component={CreateTask}
              options={{ title: 'Create Task' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
