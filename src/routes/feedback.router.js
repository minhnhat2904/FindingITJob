import { feedbackController } from '../controllers';
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;
import constant from '../constant';
const { ACTION_CODE } = constant;

export const feedbackRouter = Router();

feedbackRouter.route('/api/v1/feedbacks').get(jwtMiddleware, feedbackController.getFeedbacks);

feedbackRouter
	.route('/api/v1/feedbacks')
	.post(
		jwtMiddleware,
		checkPermission(ACTION_CODE.CREATE_FEEDBACK),
		validateRequestBody.createFeedbackSchema,
		feedbackController.createFeedback,
	);

feedbackRouter
	.route('/api/v1/feedbacks/:feedbackId')
	.delete(jwtMiddleware, checkPermission(ACTION_CODE.DELETE_FEEDBACK), feedbackController.deleteFeedback);
