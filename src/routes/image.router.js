import { imageController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMiddleware } = authMiddleware;

export const imageRouter = Router();

imageRouter.route('/api/v1/images').get(jwtMiddleware, imageController.uploadImageProfile);