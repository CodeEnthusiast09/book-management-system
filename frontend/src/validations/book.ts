import * as yup from 'yup';

export const bookValidationSchema = yup.object({
  name: yup
    .string()
    .required('Book name is required')
    .trim()
    .max(200, 'Book name cannot exceed 200 characters'),
  description: yup
    .string()
    .required('Description is required')
    .trim()
    .max(2000, 'Description cannot exceed 2000 characters'),
});

export type BookFormData = yup.InferType<typeof bookValidationSchema>;
