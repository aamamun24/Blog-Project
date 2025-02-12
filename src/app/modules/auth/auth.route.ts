import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post('/login', AuthControllers.authLogin);

export const AuthRoutes = router;
