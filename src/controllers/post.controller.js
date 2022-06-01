import mongo from "mongoose";
import { Post, Company } from "../models";
import { HttpError } from "../utils";
import { PostService, CVService, CompanyService } from "../services";

const postService = new PostService();
const cvService = new CVService();
const companyService = new CompanyService();

const createPost = async (req, res, next) => {
  const { _id } = req.user;
  const { title, skill, address, salary, endTime, description } = req.body;

  try {
    const date = new Date(endTime.split("/").reverse().join("/"));
    if (date < new Date()) throw new HttpError("end time cannot less than now");
    const company = await Company.findOne({ accountId: _id });
    if (!company) throw new HttpError("Failed", 401);
    const data = {
      accountId: _id,
      companyId: company._id,
      title,
      name: company.name,
      skill,
      address,
      salary,
      endTime,
      description,
    };
    await postService.create(data);

    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAcceptedPosts = async (req, res, next) => {
  const { query, page, take } = req.query;
  try {
    const posts = await postService.getPosts(query, "ACCEPTED", page, take);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostsNeedAccept = async (req, res, next) => {
  const { query, take, page } = req.query;
  try {
    const data = await postService.getPosts(query, "WAITING", page, take);
    res.status(200).json({
      status: 200,
      msg: "Success",
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { _id } = req.user;
  const { postId } = req.params;
  const { skill, address, salary, endTime, description, title } = req.body;
  try {
    const date = new Date(endTime.split("/").reverse().join("/"));
    if (date < new Date()) throw new HttpError("end time cannot less than now");

    if (!mongo.Types.ObjectId.isValid(postId))
      throw new HttpError("Not found post!", 400);

    const postWithUser = await Post.findOne(
      { accountId: _id, _id: postId },
      { __v: 1 }
    );
    if (!postWithUser) {
      throw new HttpError("Deny update!", 401);
    }

    const data = { skill, address, salary, endTime, description, title };
    if (!(await postService.update(postId, data))) {
      throw new HttpError("Post not found", 404);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(postId)) {
      throw new HttpError("PostID not found!", 400);
    }
    if (!(await postService.deletePost(postId))) {
      throw new HttpError("Post not found!", 400);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};


const acceptPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(postId))
      throw new HttpError("Post not found!", 400);
    const check = await postService.acceptPost(postId);
    if (check == 0) throw new HttpError("Post not found!", 400);
    if (check == 1) throw new HttpError("Post has been accepted", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const acceptMany = async (req, res, next) => {
  const { listId } = req.body;
  try {
    if (listId && listId.length == 0) {
      throw new HttpError("List is empty", 400);
    }
    for (let i = 0; i < listId.length; i += 100) {
      let acceptList = listId.slice(i, i + 100).map((e) => {
        return postService.acceptPost(e);
      });
      await Promise.all(acceptList);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCompanyPost = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const posts = await postService.getCompanyPost(_id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      posts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const applyJob = async (req, res, next) => {
  const { _id } = req.params;
  const iterId = req.user._id;
  try {
    const cv = await cvService.getCVByUser(iterId);
    if (!cv) {
      throw new HttpError("Please create cv before using this feature", 400);
    }
    if (!(await postService.getPost(_id))) {
      throw new HttpError("Post not found!", 400);
    }
    if (!(await postService.applyPost(_id, iterId, cv._id))) {
      throw new HttpError("You have already applied it before", 400);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};



const listApply = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const post = await postService.getPost(_id);
    if (post.length == 0) throw new HttpError("Post not found!", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
      applies: post[0].apply,
      title: post[0].title,
    });
  } catch (error) {
    next(error);
  }
};


const getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const posts = await postService.getPost(postId);
    if (!posts || posts.length == 0)
      throw new HttpError("Post not found!", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
      post: posts[0],
    });
  } catch (error) {
    next(error);
  }
};

const getPostsByCompanyId = async (req, res, next) => {
  const { companyId } = req.params;
  try {
    const posts = await postService.listPostsByCompanyId(companyId);
    const company = await companyService.getCompany(companyId);
    res.status(200).json({
      status: 200,
      msg: "Success",
      company,
      posts,
    });
  } catch (error) {
    next(error);
  }
};


const donePost = async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (!(await postService.donePost(_id)))
      throw new HttpError("Post not found!", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};


const responseListApply = async (req, res, next) => {
  const { postId } = req.params;
  const { listResponse } = req.body;
  const { _id } = req.user;
  try {
    if (!postId) {
      throw new HttpError("Post not found!", 404);
    } 
    const post = await postService.getPost(postId);
    if (!post) {
      throw new HttpError("Post not found!", 404);
    }

    await postService.responseListApply(_id, postId, listResponse);

    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const listAppliedPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const posts = await postService.listAppliedPosts(userId);
    res.status(200).json({
      status: 200,
      msg: "Success",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const savePost = async (req, res, next) => {
  const { postId } = req.body;
  const userId = req.user._id;
  try {
    const post = await postService.getPost(postId);
    if (!post) throw new HttpError("Post not found!", 404);
    const save = await postService.savePost(userId, postId);

    res.status(200).json({
      status: 200,
      msg: `You have successfully ${save ? "saved" : "un saved"}`,
    });
  } catch (error) {
    next(error);
  }
};


const listSavedPosts = async (req, res, next) => {
  try {
    const posts = await postService.getSavedPosts(req.user._id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const postController = {
  createPost,
  getAcceptedPosts,
  getPostsNeedAccept,
  updatePost,
  deletePost,
  acceptPost,
  getCompanyPost,
  applyJob,
  listApply,
  getPost,
  getPostsByCompanyId,
  donePost,
  acceptMany,
  responseListApply,
  listAppliedPosts,
  listSavedPosts,
  savePost,
};
