import { TypedDocumentNode, gql } from '@apollo/client';

import { Task, Week } from '@/types/tasks';

interface MutationResponse {
  success: boolean;
  message: string;
  code: string;
}

interface UpdateTaskCompletionStatusData {
  editTask: {
    task: Task;
  } & MutationResponse;
}

export const UPDATE_TASK_COMPLETION_STATUS: TypedDocumentNode<UpdateTaskCompletionStatusData> = gql`
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

interface UpdateTotalTasksCompletedData {
  updateTotalTasksCompleted: {
    week: Week;
  } & MutationResponse;
}

export const UPDATE_TOTAL_TASKS_COMPLETED: TypedDocumentNode<UpdateTotalTasksCompletedData> = gql`
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

interface CreateTaskData {
  createTask: {
    task: Task;
  } & MutationResponse;
}

export const CREATE_TASK: TypedDocumentNode<CreateTaskData> = gql`
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

interface EditTaskData {
  editTask: {
    task: Task;
  } & MutationResponse;
}

export const EDIT_TASK: TypedDocumentNode<EditTaskData> = gql`
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

interface DeleteTaskData {
  deleteTask: {
    task: Task;
  } & MutationResponse;
}

export const DELETE_TASK: TypedDocumentNode<DeleteTaskData> = gql`
  mutation DeleteTask($weekId: ID, $day: DayOfWeek, $taskId: ID) {
    deleteTask(weekId: $weekId, day: $day, taskId: $taskId) {
      success
      message
      code
      task {
        _id
      }
    }
  }
`;
