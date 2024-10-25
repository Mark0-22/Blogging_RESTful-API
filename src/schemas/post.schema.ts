import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type postDoucment = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  category: string;
  @Prop([String])
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
