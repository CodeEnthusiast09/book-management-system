import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  HStack,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Navbar } from "../components/common/Navbar";
import { BooksTable } from "../components/books/BooksTable";
import { BookFormModal } from "../components/books/BookFormModal";
import { DeleteConfirmModal } from "../components/books/DeleteConfirmModal";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../interfaces/book.interface";

export const Dashboard = () => {
  const {
    books,
    loading,
    error,
    creating,
    updating,
    deleting,
    createBook,
    updateBook,
    deleteBook,
  } = useBooks();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleCreate = () => {
    setSelectedBook(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data: {
    name: string;
    description: string;
  }) => {
    if (selectedBook) {
      await updateBook({ id: selectedBook.id, ...data });
    } else {
      await createBook(data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedBook) {
      await deleteBook(selectedBook.id);
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />

      <Container maxW="container.xl" py={8}>
        <HStack justifyContent="space-between" mb={6}>
          <Heading size="lg">Books Collection</Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleCreate}
          >
            Add Book
          </Button>
        </HStack>

        {loading && (
          <Center py={20}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Center>
        )}

        {error && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Error loading books</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Box>
          </Alert>
        )}

        {!loading && !error && (
          <Box bg="white" rounded="lg" shadow="sm" p={1}>
            <BooksTable
              books={books}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </Box>
        )}
      </Container>

      <BookFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        book={selectedBook}
        isLoading={creating || updating}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        book={selectedBook}
        isLoading={deleting}
      />
    </Box>
  );
};
