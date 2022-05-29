import { Router } from 'express';
import { analysisController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';
import constant from '../constant';
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;
const { ACTION_CODE } = constant;
export const analysisRouter = Router();

analysisRouter
    .route('/api/v1/analysis/post')
    .get(jwtMiddleware, checkPermission(ACTION_CODE.ANALYSIS), analysisController.analysisOfPost);

analysisRouter
    .route('/api/v1/analysis/skill')
    .get(jwtMiddleware, checkPermission(ACTION_CODE.ANALYSIS), analysisController.analysisOfSkill);

analysisRouter
    .route('/api/v1/analysis/user')
    .get(jwtMiddleware, checkPermission(ACTION_CODE.ANALYSIS), analysisController.analysisUser);
