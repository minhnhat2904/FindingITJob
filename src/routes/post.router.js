import { postController } from "../controllers";
import {
  validateRequestBody,
  authMiddleware,
  roleMiddleware,
} from "../middlewares";

import { Router } from "express";
import constant from "../constant";
const { ACTION_CODE } = constant;
const { jwtMiddleware } = authMiddleware;
const { checkPermission } = roleMiddleware;

export const postRouter = Router();

postRouter.route("/api/v1/posts").get(postController.getAcceptedPosts);

postRouter
  .route("/api/v1/posts/need-accept")
  .get(jwtMiddleware, postController.getPostsNeedAccept);

postRouter
  .route("/api/v1/posts/company/:companyId")
  .get(postController.getPostsByCompanyId);

postRouter
  .route("/api/v1/posts/:postId/accept-post")
  .patch(
    jwtMiddleware,
    checkPermission(ACTION_CODE.ACCEPT_POST),
    postController.acceptPost
  );

postRouter
  .route("/api/v1/posts/accept-many")
  .patch(
    jwtMiddleware,
    checkPermission(ACTION_CODE.ACCEPT_POST),
    postController.acceptMany
  );

postRouter
  .route("/api/v1/posts")
  .post(
    jwtMiddleware,
    checkPermission(ACTION_CODE.CREATE_POST),
    validateRequestBody.createPostSchema,
    postController.createPost
  );

postRouter
  .route("/api/v1/posts/:postId")
  .put(
    jwtMiddleware,
    checkPermission(ACTION_CODE.UPDATE_POST),
    validateRequestBody.updatePostSchema,
    postController.updatePost
  );

postRouter
  .route("/api/v1/posts/:postId")
  .delete(
    jwtMiddleware,
    checkPermission(ACTION_CODE.DELETE_POST),
    postController.deletePost
  );

postRouter.route("/api/v1/posts/:postId/detail").get(postController.getPost);

postRouter
  .route("/api/v1/posts/company")
  .get(
    jwtMiddleware,
    checkPermission(ACTION_CODE.GET_COMPANY_POST),
    postController.getCompanyPost
  );

postRouter
  .route("/api/v1/posts/:_id/apply")
  .get(
    jwtMiddleware,
    checkPermission(ACTION_CODE.APPLY_JOB),
    postController.applyJob
  );

postRouter
  .route("/api/v1/posts/:_id/apply-list")
  .get(jwtMiddleware, postController.listApply);

postRouter
  .route("/api/v1/posts/:_id/complete")
  .patch(jwtMiddleware, postController.donePost);

postRouter
  .route("/api/v1/posts/:postId/response-apply")
  .post(jwtMiddleware, postController.responseListApply);

postRouter
  .route("/api/v1/posts/applied")
  .get(jwtMiddleware, postController.listAppliedPosts);

postRouter
  .route("/api/v1/posts/saved")
  .post(jwtMiddleware, postController.savePost);

postRouter
  .route("/api/v1/posts/saved")
  .get(jwtMiddleware, postController.listSavedPosts);
