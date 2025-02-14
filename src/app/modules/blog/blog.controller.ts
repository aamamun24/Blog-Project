import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const payloadData = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.userId,
  };

  const result = await BlogServices.createBlogIntoDB(payloadData);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await BlogServices.updateBlogIntoDB(id, userId, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: status.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const result = await BlogServices.deleteBlogFromDB(id, userId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: status.OK,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: status.OK,
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
