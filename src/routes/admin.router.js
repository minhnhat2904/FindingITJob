import { authMiddleware, validateRequestBody } from '../middlewares';
import { adminController } from '../controllers';
import { Router } from 'express';


const { jwtMiddleware } = authMiddleware;

export const adminRouter = Router();

adminRouter
    .route('/api/v1/admin/login')
    .post(validateRequestBody.loginAdminSchema, adminController.login);
