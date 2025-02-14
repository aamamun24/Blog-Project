import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const payloadData = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.userId,
    isPublished: req.body.isPublished,
  };

  const data = await BlogServices.createBlogIntoDB(payloadData);

  const result = {
    _id: data._id,
    title: data.title,
    content: data.content,
    author: data.author,
  };

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
  const { userId, role } = req.user;

  const result = await BlogServices.deleteBlogFromDB(id, userId, role);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: status.OK,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

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
