import { configureStore } from '@reduxjs/toolkit';

import { globalReducer, tasksReducer } from './slices';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
