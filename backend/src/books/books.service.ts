import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  // Get all books
  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Get single book by ID
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book not found`);
    }

    return book;
  }

  // Create new book
  async create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.booksRepository.create(createBookInput);
    return this.booksRepository.save(book);
  }

  // Update existing book
  async update(updateBookInput: UpdateBookInput): Promise<Book> {
    const { id, ...updateData } = updateBookInput;

    // Check if book exists
    const book = await this.findOne(id);

    // Update book
    Object.assign(book, updateData);
    return this.booksRepository.save(book);
  }

  // Delete book
  async remove(id: number): Promise<boolean> {
    // Check if book exists
    await this.findOne(id);

    // Delete book
    const result = await this.booksRepository.delete(id);

    return (result.affected ?? 0) > 0;
  }
}
