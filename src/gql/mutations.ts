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
