import { Text, View } from 'react-native';

import { Task } from '@/components/Task';
import { ProgressBar } from '@/components/common';

export default function AllTasks() {
  return (
    <View>
      <View>
        <Text>15.01/21.01</Text>
        <Text>10 of 20 completed</Text>
        <ProgressBar progress={50} />
      </View>
      <Task />
      <Task />
      <Task />
      <Task />
    </View>
  );
}
