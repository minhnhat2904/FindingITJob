import { Router } from "express";
import { iterController } from "../controllers";
import {
  validateRequestBody,
  authMiddleware,
  roleMiddleware,
} from "../middlewares";
import constant from "../constant";
const { ACTION_CODE } = constant;
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

export const iterRouter = Router();

iterRouter
  .route("/api/v1/iters")
  .get(
    jwtMiddleware,
    checkPermission(ACTION_CODE.GET_USERS),
    iterController.getIters
  );

iterRouter
  .route("/api/v1/iters/:id")
  .delete(
    jwtMiddleware,
    checkPermission(ACTION_CODE.DELETE_USER),
    iterController.deleteIter
  );

iterRouter
  .route("/api/v1/iters/receive-mail")
  .patch(
    jwtMiddleware,
    checkPermission(ACTION_CODE.RECEIVE_MAIL),
    validateRequestBody.registerEmailSchema,
    iterController.receiveMail
  );
