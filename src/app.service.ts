import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import mongoose, { Model } from 'mongoose';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const createPost = new this.postModel(createPostDto);
      return createPost.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'custom message',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async fetchBlog(id: mongoose.Types.ObjectId) {
    const blog = await this.postModel.findById(id).exec();
    if (blog !== undefined || null) {
      return blog;
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async updateBlog(id: mongoose.Types.ObjectId, body: UpdatePostDto) {
    const blog = await this.postModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (blog === null) {
      throw new NotFoundException("Blog with that ID doesn't exists");
    }
    return blog.save();
  }

  async deleteBlog(id: mongoose.Types.ObjectId) {
    const blog = await this.postModel.findById(id);
    if (blog === null) {
      throw new NotFoundException("Blog with that ID doesn't exists");
    }
    await this.postModel.findByIdAndDelete(id);
  }

  async fetchAllBlogs(term: string) {
    const blogs = await this.postModel
      .find({
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { content: { $regex: term, $options: 'i' } },
          { category: { $regex: term, $options: 'i' } },
        ],
      })
      .exec();
    return blogs;
  }
}
