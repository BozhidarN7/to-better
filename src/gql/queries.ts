import { TypedDocumentNode, gql } from '@apollo/client';

import Week from '@/types/tasks/week';

interface Data {
  weeks: Week[];
}

export const GET_WEEKS: TypedDocumentNode<Data> = gql`
  query GetWeeks {
    weeks {
      _id
      tasksCompleted
      totalTasks
      sevenDaysPeriod {
        startDate
        endDate
      }
      tasks {
        monday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        tuesday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        wednesday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        thursday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        friday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        saturday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
        sunday {
          _id
          title
          description
          priority
          category
          isCompleted
          dayOfWeek
          weekId
        }
      }
    }
  }
`;
