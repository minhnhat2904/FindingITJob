import { Router } from 'express';
import { cvController } from '../controllers';
import constant from '../constant';
const { ACTION_CODE } = constant;
import { validateRequestBody, authMiddleware, roleMiddleware } from '../middlewares';
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

export const cvRouter = Router();

cvRouter
	.route('/api/v1/cv')
	.post(jwtMiddleware, checkPermission(ACTION_CODE.CREATE_CV), validateRequestBody.createCVSchema, cvController.createCV);
