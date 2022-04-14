import { Router } from 'express';
import { authController } from '../controllers';
import { validateRequestBody, authMiddleware } from '../middlewares';

const { jwtMiddleware } = authMiddleware;

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

authRouter
    .route('/api/v1/auth/update-password')
    .post(jwtMiddleware, validateRequestBody.updatePasswordSchema, authController.updatePassword);

authRouter
    .route('/api/v1/auth/reset-password')
    .post(validateRequestBody.requestResetPassword, authController.requestResetPassword);

authRouter
    .route('/api/v1/auth/confirm-code')
    .post(authController.confirmCode);

authRouter
	.route('/api/v1/auth/change-password')
	.post(validateRequestBody.changeResetPassword, authController.changePasswordReset);

authRouter
    .route('/api/v1/auth/profile')
    .get(jwtMiddleware, authController.profile);

