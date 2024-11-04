import { gql } from "@apollo/client";

export const Get_All_Users = gql`
  query getAllUsers {
    users {
      _id
      name
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
 query GET_CATEGORIES {
  categories {
    name,
    _id
  }
}
`;
