import { Router } from 'express';
import { authController } from '../controllers';
import { validateRequestBody } from '../middlewares';

export const authRouter = Router();

authRouter
    .route('/api/v1/auth/login')
    .post(validateRequestBody.loginSchema, authController.login);

authRouter
    .route('/api/v1/auth/register-iter')
    .post(validateRequestBody.registerSchema, authController.registerITer);

authRouter
    .route('/api/v1/auth/register-company')
    .post(validateRequestBody.registerSchema, authController.registerCompany);