import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BooksService } from './books/books.service';
import { Logger } from '@nestjs/common';

const logger = new Logger('Seed');

async function seed() {
  logger.log('🌱 Starting database seeding...');

  // Create NestJS application context
  const app = await NestFactory.createApplicationContext(AppModule);
  const booksService = app.get(BooksService);

  // Sample books data
  const sampleBooks = [
    {
      name: 'The Great Gatsby',
      description:
        'A classic novel by F. Scott Fitzgerald set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the mysterious millionaire Jay Gatsby.',
    },
    {
      name: '1984',
      description:
        "George Orwell's dystopian masterpiece about totalitarianism, surveillance, and the manipulation of truth in a society ruled by Big Brother.",
    },
    {
      name: 'To Kill a Mockingbird',
      description:
        "Harper Lee's Pulitzer Prize-winning novel addressing racial injustice in the American South through the eyes of young Scout Finch and her father, lawyer Atticus Finch.",
    },
    {
      name: 'Pride and Prejudice',
      description:
        "Jane Austen's romantic novel exploring themes of love, class, and social expectations through the relationship between Elizabeth Bennet and Mr. Darcy.",
    },
    {
      name: 'The Hobbit',
      description:
        "J.R.R. Tolkien's fantasy adventure following Bilbo Baggins on an unexpected journey with dwarves to reclaim their treasure from the dragon Smaug.",
    },
    {
      name: "Harry Potter and the Philosopher's Stone",
      description:
        "J.K. Rowling's magical tale of a young wizard discovering his true identity and beginning his education at Hogwarts School of Witchcraft and Wizardry.",
    },
    {
      name: 'The Catcher in the Rye',
      description:
        "J.D. Salinger's coming-of-age novel following teenager Holden Caulfield as he navigates alienation, identity, and the transition from childhood to adulthood.",
    },
    {
      name: 'The Lord of the Rings',
      description:
        "J.R.R. Tolkien's epic fantasy trilogy following the quest to destroy the One Ring and defeat the dark lord Sauron in Middle-earth.",
    },
  ];

  // Check if books already exist
  const existingBooks = await booksService.findAll();

  if (existingBooks.length > 0) {
    logger.warn(
      `Database already has ${existingBooks.length} books. Skipping seed.`,
    );

    logger.log('Delete database.sqlite to re-seed or add more books manually.');

    await app.close();

    return;
  }

  // Create books
  logger.log(`Creating ${sampleBooks.length} sample books...`);

  for (const bookData of sampleBooks) {
    const book = await booksService.create(bookData);
    logger.log(`Created: ${book.name} (ID: ${book.id})`);
  }

  logger.log('Seeding completed successfully!');

  logger.log(`Total books: ${sampleBooks.length}`);

  await app.close();
  process.exit(0);
}

// Run seed function
seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
