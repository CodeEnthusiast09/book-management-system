// import { useState, useEffect } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   FormErrorMessage,
// } from "@chakra-ui/react";
// import { Book } from "../../interfaces/book.interface";

// interface BookFormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: { name: string; description: string }) => Promise<void>;
//   book?: Book | null;
//   isLoading: boolean;
// }

// export const BookFormModal = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   book,
//   isLoading,
// }: BookFormModalProps) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [errors, setErrors] = useState<{ name?: string; description?: string }>(
//     {}
//   );

//   // Populate form when editing
//   useEffect(() => {
//     if (book) {
//       setName(book.name);
//       setDescription(book.description);
//     } else {
//       setName("");
//       setDescription("");
//     }
//     setErrors({});
//   }, [book, isOpen]);

//   const validate = () => {
//     const newErrors: { name?: string; description?: string } = {};

//     if (!name.trim()) {
//       newErrors.name = "Book name is required";
//     } else if (name.length > 200) {
//       newErrors.name = "Book name cannot exceed 200 characters";
//     }

//     if (!description.trim()) {
//       newErrors.description = "Description is required";
//     } else if (description.length > 2000) {
//       newErrors.description = "Description cannot exceed 2000 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     await onSubmit({ name: name.trim(), description: description.trim() });
//     handleClose();
//   };

//   const handleClose = () => {
//     setName("");
//     setDescription("");
//     setErrors({});
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose} size="xl">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>{book ? "Edit Book" : "Create New Book"}</ModalHeader>
//         <ModalCloseButton />

//         <ModalBody pb={6}>
//           <FormControl isInvalid={!!errors.name} mb={4}>
//             <FormLabel>Book Name</FormLabel>
//             <Input
//               placeholder="Enter book name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <FormErrorMessage>{errors.name}</FormErrorMessage>
//           </FormControl>

//           <FormControl isInvalid={!!errors.description}>
//             <FormLabel>Description</FormLabel>
//             <Textarea
//               placeholder="Enter book description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={6}
//             />
//             <FormErrorMessage>{errors.description}</FormErrorMessage>
//           </FormControl>
//         </ModalBody>

//         <ModalFooter>
//           <Button onClick={handleClose} mr={3}>
//             Cancel
//           </Button>
//           <Button
//             colorScheme="blue"
//             onClick={handleSubmit}
//             isLoading={isLoading}
//           >
//             {book ? "Update" : "Create"}
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Book } from "../../interfaces/book.interface";
import { BookFormData, bookValidationSchema } from "../../validations/book";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => Promise<void>;
  book?: Book | null;
  isLoading: boolean;
}

export const BookFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  book,
  isLoading,
}: BookFormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: yupResolver(bookValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Populate form when editing or reset when creating
  useEffect(() => {
    if (book) {
      reset({
        name: book.name,
        description: book.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [book, isOpen, reset]);

  const handleFormSubmit = async (data: BookFormData) => {
    await onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{book ? "Edit Book" : "Create New Book"}</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.name} mb={4}>
              <FormLabel>Book Name</FormLabel>
              <Input placeholder="Enter book name" {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter book description"
                rows={6}
                {...register("description")}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose} mr={3} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              {book ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
