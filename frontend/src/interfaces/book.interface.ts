export interface Book {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  name: string;
  description: string;
}

export interface UpdateBookInput {
  id: string;
  name?: string;
  description?: string;
}
