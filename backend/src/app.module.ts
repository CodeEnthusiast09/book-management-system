import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GraphqlContext } from './graphql/graphql-context.interface';
import { RequestWithUser } from './auth/interface/request-with-user.interface';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    // Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    // GraphQL configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }: { req: RequestWithUser }): GraphqlContext => ({ req }), // Pass request to context for auth
    }),

    // SQLite Database configuration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './database.sqlite',
      entities: [Book],
      synchronize: true, // Auto-create tables (for dev only)
      logging: true,
    }),

    AuthModule,

    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
