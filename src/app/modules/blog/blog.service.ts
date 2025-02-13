import status from 'http-status';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }

  if (blog?.author.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not authorized to update this blog!',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
};
