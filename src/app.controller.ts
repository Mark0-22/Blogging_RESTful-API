import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPost.dto';
import { Response } from 'express';
import { Types } from 'mongoose';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('blogs')
  @Get()
  @ApiQuery({ name: 'term', required: false, type: String })
  async posts(@Res() res: Response, @Query('term') term?: string) {
    if (term) {
      const blogs = await this.appService.fetchAllBlogs(term);
      if (blogs.length === 0) {
        res
          .status(200)
          .json({ message: `There are no blogs with term '${term}'` });
      } else {
        res.status(200).send(blogs);
      }
    } else {
      const posts = await this.appService.findAll();
      res.status(200).send(posts);
    }
  }

  @ApiTags('blogs')
  @Post()
  @ApiBody({ type: CreatePostDto })
  // @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    const post = await this.appService.createPost(createPostDto);
    res.status(201).send(post);
  }

  @ApiTags('blogs')
  @Get(':id')
  async fetchBlog(@Param('id') id: string, @Res() res: Response) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Blog with that ID doesn't exists");
    }
    const blogId = new Types.ObjectId(id);
    const blog = await this.appService.fetchBlog(blogId);
    res.status(200).send(blog);
  }

  @ApiTags('blogs')
  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
    @Res() res: Response,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Blog with that ID doesn't exists");
    }

    const blogId = new Types.ObjectId(id);
    const blog = await this.appService.updateBlog(blogId, body);
    res.status(200).send(blog);
  }

  @ApiTags('blogs')
  @Delete(':id')
  async deleteBlog(@Param('id') id: string, @Res() res: Response) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException("Blog with that ID doesn't exists");
    }
    const blogId = new Types.ObjectId(id);
    await this.appService.deleteBlog(blogId);

    res.status(204).json({ message: 'Post deleted successfully' });
  }
}
