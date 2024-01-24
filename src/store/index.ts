import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from './slices';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
