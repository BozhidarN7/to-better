import { TypedDocumentNode, gql } from '@apollo/client';

import Week from '@/types/tasks/week';

interface Data {
  weeks: Week[];
}

export const GET_WEEKS: TypedDocumentNode<Data> = gql`
  query GetWeeks {
    weeks {
      _id
      sevenDaysPeriod {
        startDate
        endDate
      }
      tasksCompleted
      totalTasks
      tasks {
        friday {
          title
        }
      }
    }
  }
`;
