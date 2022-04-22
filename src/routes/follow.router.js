import { followController } from '../controllers';
import { authMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMiddleware } = authMiddleware;

export const followRouter = Router();

followRouter.route('/api/v1/followers').post(jwtMiddleware, followController.follow);

// followRouter.route('/api/v1/followers/following').get(jwtMiddleware, followController.getFollowing);
