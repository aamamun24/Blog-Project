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

export const BlogControllers = {
  createBlog,
};
