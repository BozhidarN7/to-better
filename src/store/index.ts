import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from './slices';

import { tasksApi } from '@/services/tasks';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
