import { authMiddleware, validateRequestBody, roleMiddleware } from '../middlewares';
import { adminController } from '../controllers';
import { Router } from 'express';
import constants from '../constant';

const { ACTION_CODE } = constants;


const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

export const adminRouter = Router();

adminRouter
    .route('/api/v1/admin/login')
    .post(validateRequestBody.loginAdminSchema, adminController.login);

adminRouter
	.route('/api/v1/moderators')
	.post(
		jwtMiddleware,
		checkPermission(ACTION_CODE.CREATE_MOD),
		validateRequestBody.createModSchema,
		adminController.createMod,
	);

adminRouter.route('/api/v1/moderators').get(jwtMiddleware, checkPermission(ACTION_CODE.GET_USERS), adminController.getMods);

adminRouter
	.route('/api/v1/moderators/:id')
	.delete(jwtMiddleware, checkPermission(ACTION_CODE.DELETE_USER), adminController.deleteMod);
