import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'My Updated Blog Post' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: 'This is the content of my updated blog post.' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @ApiProperty({ example: 'Art' })
  @IsNotEmpty({ message: 'Category is required' })
  category: string;

  @ApiProperty({ example: `['Art', 'Football']` })
  @IsNotEmpty({ message: 'Tags are required' })
  tags: string[];
}
