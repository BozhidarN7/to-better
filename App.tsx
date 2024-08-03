// import 'expo-dev-client';
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
import { ErrorCodes } from '@/enums';
import {
  AllTasks,
  DailyTasks,
  Register,
  CreateTask,
  LoginScreen,
} from '@/screens';
import store from '@/store';
import { RootStackParamList } from '@/types/navigator-types';
import { handleGraphqlError } from '@/utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

console.log('to-better:backend-api', API_URL);
const httpLink = new HttpLink({
  uri: API_URL,
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    handleGraphqlError(
      graphQLErrors.map(({ message, locations, path }) => ({
        error: new Error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
        errorCode: ErrorCodes.GeneralGraphQLError,
      })),
    );
  }

  if (networkError) {
    handleGraphqlError([
      { error: networkError, errorCode: ErrorCodes.GeneralNetworkError },
    ]);
  }
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
                initialRouteName="Login"
                screenOptions={{
                  headerStyle: { backgroundColor: COLORS.SECONDARY_100 },
                  headerTintColor: COLORS.PRIMARY,
                }}
              >
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ title: 'Register' }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ title: 'Log in' }}
                />
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
