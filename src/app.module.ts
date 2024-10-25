import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoDbUrl: string =
  process.env.MONGODB || 'mongodb://localhost:27017/blogs';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbUrl),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
