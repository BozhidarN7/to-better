import { Client } from 'rollbar-react-native';

import { ErrorLevels } from '@/enums';

const rollbar = new Client({
  accessToken: 'd49318ed4b7b4e09958145662b067122',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const logToRollbar = <T extends Error>(error: T, errorLevel: ErrorLevels) => {
  switch (errorLevel) {
    case ErrorLevels.Log:
      rollbar.log(error);
      break;
    case ErrorLevels.Debug:
      rollbar.debug(error);
      break;
    case ErrorLevels.Info:
      rollbar.info(error);
      break;
    case ErrorLevels.Warning:
      rollbar.warning(error);
      break;
    case ErrorLevels.Error:
      rollbar.error(error);
      break;
    case ErrorLevels.Critical:
      rollbar.critical(error);
      break;
    default:
      rollbar.log(error);
      break;
  }
};

export default function logError<T extends Error>(
  error: T,
  errorLevel: ErrorLevels,
) {
  logToRollbar(error, errorLevel);
}
