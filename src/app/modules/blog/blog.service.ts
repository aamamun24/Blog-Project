import status from 'http-status';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

const deleteBlogFromDB = async (id: string, userId: string, role: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }

  if (blog?.author.toString() !== userId && role !== 'admin') {
    throw new AppError(
      status.FORBIDDEN,
      'You are not authorized to delete this blog!',
    );
  }

  await Blog.findByIdAndDelete(id);
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(
    Blog.find()
      .populate({ path: 'author', select: '+_id name email role' })
      .select('+_id title content'),
    query,
  )
    .search(['title', 'content'])
    .sort()
    .authorFilter();

  const result = await blogsQuery.modelQuery;
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
