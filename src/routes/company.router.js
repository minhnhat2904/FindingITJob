import { Router } from 'express';
import constant from '../constant';
const { ACTION_CODE } = constant;
import { companyController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

export const companyRouter = Router();

companyRouter
	.route('/api/v1/companies/:id')
	.delete(jwtMiddleware, checkPermission(ACTION_CODE.DELETE_USER), companyController.deleteCompany);

companyRouter
	.route('/api/v1/companies')
	.get(jwtMiddleware, checkPermission(ACTION_CODE.GET_USERS), companyController.getCompanies);

companyRouter.route('/api/v1/companies/info').get(companyController.getCompaniesInfo);