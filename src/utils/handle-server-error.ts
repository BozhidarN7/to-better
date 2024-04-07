import { Alert } from 'react-native';

import logError from './log-error';

import { ErrorLevels } from '@/enums';

interface Response {
  success?: boolean;
  message?: string;
  code?: string;
}
export default function handleServerError(responses: Response[]) {
  responses.forEach((response) => {
    if (response.success === false) {
      logError(new Error(response.message), ErrorLevels.Error);
      Alert.alert(
        `The server was unable to execute the opration (code ${response.code})`,
        response.message,
      );
    }
  });
}
