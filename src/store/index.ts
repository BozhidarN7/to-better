import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from './slices';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
