import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Task } from '@/types/tasks';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://to-better-39f6f-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks.json',
    }),
    createTask: builder.mutation<Task, void>({
      query: ({ weekId, day, task }) => {
        console.log(weekId);
        console.log(day);
        console.log(task);
        return {
          url: `tasks.json`,
          method: 'POST',
          body: { [`1/tasks/wednesday`]: task },
        };
      },
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApi;
