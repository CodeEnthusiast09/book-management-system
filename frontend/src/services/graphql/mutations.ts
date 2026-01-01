import { gql } from "@apollo/client";
import { BOOK_FIELDS } from "./queries";

// Mutation to create a book
export const CREATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      ...BookFields
    }
  }
`;

// Mutation to update a book
export const UPDATE_BOOK = gql`
  ${BOOK_FIELDS}
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
      ...BookFields
    }
  }
`;

// Mutation to delete a book
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;
