import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  // Query: Get all books (Protected - requires authentication)
  @Query(() => [Book], { name: 'books', description: 'Get all books' })
  @UseGuards(GqlAuthGuard)
  async getBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  // Query: Get single book (Protected - requires authentication)
  @Query(() => Book, { name: 'book', description: 'Get a single book by ID' })
  @UseGuards(GqlAuthGuard)
  async getBook(@Args('id', { type: () => ID }) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  // Mutation: Create book (Protected - requires authentication)
  @Mutation(() => Book, { description: 'Create a new book' })
  @UseGuards(GqlAuthGuard)
  async createBook(
    @Args('input') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.booksService.create(createBookInput);
  }

  // Mutation: Update book (Protected - requires authentication)
  @Mutation(() => Book, { description: 'Update an existing book' })
  @UseGuards(GqlAuthGuard)
  async updateBook(
    @Args('input') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.booksService.update(updateBookInput);
  }

  // Mutation: Delete book (Protected - requires authentication)
  @Mutation(() => Boolean, { description: 'Delete a book' })
  @UseGuards(GqlAuthGuard)
  async deleteBook(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    return this.booksService.remove(id);
  }
}
