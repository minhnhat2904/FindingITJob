import { notificationController } from '../controllers';
import { authMiddleware } from '../middlewares';

import { Router } from 'express';
const { jwtMiddleware } = authMiddleware;


export const notificationRouter = Router();

notificationRouter
	.route('/api/v1/notifications')
	.get(jwtMiddleware, notificationController.notifications);

notificationRouter
	.route('/api/v1/notifications/number')
	.get(jwtMiddleware, notificationController.numberOfNotifications);

notificationRouter.route('/api/v1/notifications/reset').post(jwtMiddleware, notificationController.reset);
