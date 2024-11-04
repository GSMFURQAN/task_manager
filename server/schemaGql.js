import { gql } from 'graphql-tag';
import { userTypeDefs } from './gqlSchemas/userTypeDefs.js';
import { taskTypeDefs } from './gqlSchemas/taskTypeDefs.js';
import { categoryTypeDefs } from './gqlSchemas/categoryTypeDefs.js';


export const typeDefs = gql`

  ${userTypeDefs}
  ${taskTypeDefs}
 ${categoryTypeDefs}
`;