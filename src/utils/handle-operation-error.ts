import { Alert } from 'react-native';

import logError from './log-error';

import { ErrorCodes, ErrorLevels } from '@/enums';

type OperationError = {
  error: Error | undefined;
  errorCode: ErrorCodes;
};

export default function handleOperationError(
  operationError: OperationError | OperationError[],
) {
  const errors = Array.isArray(operationError)
    ? operationError
    : [operationError];

  const validErrors = errors.filter(
    (oe) => oe.error instanceof Error && oe.error !== undefined,
  );

  if (validErrors.length > 0) {
    const firstValidError = validErrors[0];
    logError(firstValidError.error!, ErrorLevels.Error);
    Alert.alert(
      `Something went wrong (error code: ${firstValidError.errorCode})`,
      'Please try again',
    );
  }
}
