import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: 'This is the content of my first blog post.' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({ example: 'Technology' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty({ example: `['Tech', 'Programming']` })
  @IsNotEmpty({ message: 'Tags are required' })
  tags: string[];
}
