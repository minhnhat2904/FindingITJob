import { permissionController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';
import { Router } from 'express';
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

import constant from '../constant';
const { ACTION_CODE } = constant;
export const permissionRouter = Router();

permissionRouter
	.route('/api/v1/permissions')
	.get(jwtMiddleware, checkPermission(ACTION_CODE.GET_PERMISSIONS), permissionController.getPermissions);

permissionRouter
	.route('/api/v1/users/:id/permissions')
	.get(jwtMiddleware, checkPermission(ACTION_CODE.GET_USER_PERMISSIONS), permissionController.getUserPermission);