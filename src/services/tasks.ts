import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  }),
});

export const { useGetTasksQuery } = tasksApi;
