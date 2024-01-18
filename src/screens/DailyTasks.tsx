import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

interface Params extends ParamListBase {
  params: {
    day: string;
  };
}

interface DailyTasksProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: RouteProp<ParamListBase>;
}

export default function DailyTasks({ route, navigation }: DailyTasksProps) {
  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params?.day });
  }, [navigation, route.params?.day]);

  return (
    <View>
      <Text>Currently there are not tasks</Text>
    </View>
  );
}
