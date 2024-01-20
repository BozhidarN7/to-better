import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

import { DailyTasksProps } from '@/types/navigator-types/root-stack-param-list';

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
