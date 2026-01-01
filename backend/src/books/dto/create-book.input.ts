import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty({ message: 'Book name is required' })
  @IsString()
  @MaxLength(200, { message: 'Book name cannot exceed 200 characters' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Book description is required' })
  @IsString()
  @MaxLength(2000, { message: 'Description cannot exceed 2000 characters' })
  description: string;
}
