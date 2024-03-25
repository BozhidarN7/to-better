import { gql } from '@apollo/client';

export const UPDATE_TASK_COMPLETION_STATUS = gql`
  mutation EditTask($taskId: ID!, $task: EditTaskInput!) {
    editTask(taskId: $taskId, task: $task) {
      success
      message
      code
      task {
        _id
        isCompleted
      }
    }
  }
`;

export const UPDATE_TOTAL_TASKS_COMPLETED = gql`
  mutation UpdateTotalTasksCompleted($weekId: ID!, $increase: Boolean) {
    updateTotalTasksCompleted(weekId: $weekId, increase: $increase) {
      code
      success
      message
      week {
        _id
        tasksCompleted
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $weekId: ID!
    $dayOfWeek: DayOfWeek!
    $task: CreateTaskInput!
  ) {
    createTask(weekId: $weekId, dayOfWeek: $dayOfWeek, task: $task) {
      code
      success
      message
      task {
        _id
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($taskId: ID!, $task: EditTaskInput!) {
    editTask(taskId: $taskId, task: $task) {
      success
      message
      code
      task {
        _id
      }
    }
  }
`;
