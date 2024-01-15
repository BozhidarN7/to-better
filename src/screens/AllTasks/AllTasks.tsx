import { View } from 'react-native';

import { Task } from '@/components/Task';

export default function AllTasks() {
  return (
    <View>
      <Task />
      <Task />
      <Task />
      <Task />
    </View>
  );
}
