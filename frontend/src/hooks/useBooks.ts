import { useQuery, useMutation } from "@apollo/client/react";
import { useToast } from "@chakra-ui/react";

import { GET_BOOKS } from "../services/graphql/queries";
import {
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "../services/graphql/mutations";

import {
  convertSnakeCaseKeysToCamelCase,
  convertCamelKeysToSnakeCase,
} from "../lib/utils";

import {
  Book,
  CreateBookInput,
  UpdateBookInput,
} from "../interfaces/book.interface";

export const useBooks = () => {
  const toast = useToast();

  // ----- QUERY -----
  const { data, loading, error, refetch } = useQuery<{ books: Book[] }>(
    GET_BOOKS
  );

  const books: Book[] = data?.books
    ? convertSnakeCaseKeysToCamelCase(data.books)
    : [];

  // ----- CREATE -----
  const [createBookMutation, { loading: creating }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      toast({
        title: "Book created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
  });

  const createBook = async (input: CreateBookInput) => {
    await createBookMutation({
      variables: {
        input: convertCamelKeysToSnakeCase(input),
      },
    });
  };

  // ----- UPDATE -----
  const [updateBookMutation, { loading: updating }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      toast({
        title: "Book updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
  });

  const updateBook = async (input: UpdateBookInput) => {
    await updateBookMutation({
      variables: {
        input: convertCamelKeysToSnakeCase(input),
      },
    });
  };

  // ----- DELETE -----
  const [deleteBookMutation, { loading: deleting }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      toast({
        title: "Book deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
  });

  const deleteBook = async (id: string) => {
    await deleteBookMutation({ variables: { id } });
  };

  return {
    books,
    loading,
    error,
    creating,
    updating,
    deleting,
    createBook,
    updateBook,
    deleteBook,
    refetch,
  };
};
