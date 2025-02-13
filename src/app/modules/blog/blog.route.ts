import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from '../user/blog.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth,
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRoutes = router;
