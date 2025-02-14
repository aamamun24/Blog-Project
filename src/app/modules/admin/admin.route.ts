import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { BlogControllers } from '../blog/blog.controller';

const router = Router();

router.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);

router.delete('/blogs/:id', auth('admin'), BlogControllers.deleteBlog);

export const AdminRoutes = router;
