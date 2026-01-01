import { gql } from "@apollo/client";

// Fragment for book fields
export const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    id
    name
    description
    created_at
    updated_at
  }
`;

// Query to get all books
export const GET_BOOKS = gql`
  ${BOOK_FIELDS}
  query GetBooks {
    books {
      ...BookFields
    }
  }
`;

// Query to get single book
export const GET_BOOK = gql`
  ${BOOK_FIELDS}
  query GetBook($id: ID!) {
    book(id: $id) {
      ...BookFields
    }
  }
`;
