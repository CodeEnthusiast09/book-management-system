import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Book } from "../../interfaces/book.interface";
import { formatDate } from "../../lib/utils";

interface BooksTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BooksTable = ({ books, onEdit, onDelete }: BooksTableProps) => {
  if (books.length === 0) {
    return (
      <Text textAlign="center" py={10} color="gray.500" fontSize="lg">
        No books found. Click "Add Book" to create your first book.
      </Text>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book) => (
            <Tr key={book.id} _hover={{ bg: "gray.50" }}>
              <Td fontWeight="medium">{book.name}</Td>
              <Td maxW="400px" isTruncated title={book.description}>
                {book.description}
              </Td>
              <Td fontSize="sm" color="gray.600">
                {formatDate(book.createdAt)}
              </Td>
              <Td fontSize="sm" color="gray.600">
                {formatDate(book.updatedAt)}
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit book"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => onEdit(book)}
                  />
                  <IconButton
                    aria-label="Delete book"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => onDelete(book)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
