import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { COLORS } from '@/constants';
import { AllTasks, DailyTasks } from '@/screens';
import CreateTask from '@/screens/CreateTask';
import store from '@/store';
import { RootStackParamList } from '@/types/navigator-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const httpLink = new HttpLink({
  uri: API_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default function App() {
  return (
    <>
      <StatusBar />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NavigationContainer>
            <ErrorBoundary>
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
            </ErrorBoundary>
          </NavigationContainer>
        </Provider>
      </ApolloProvider>
    </>
  );
}
