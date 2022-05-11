import mongo from "mongoose";
import { HttpError } from "../utils";
import { ITerService, CVService } from "../services";

const cvService = new CVService();
const iterService = new ITerService();

const getIters = async (req, res, next) => {
  const { page, take } = req.query;
  try {
    const data = await iterService.getIters(page, take);
    res.status(200).json({
      status: 200,
      msg: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteIter = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id))
      throw new HttpError("Id incorrect", 401);
    if (!(await iterService.deleteIter(id)))
      throw new HttpError("Iter not found", 400);
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const receiveMail = async (req, res, next) => {
  const { receive } = req.body;
  const { _id } = req.user;
  try {
    if (!(await cvService.getCVByUser(_id)))
      throw new HttpError("Please create cv before using this feature", 400);
    if (!(await iterService.registerSendEmail(_id, receive)))
      throw new HttpError("Iter not found", 400);
    let msg = receive
      ? "You have subscribed to receive email for job search"
      : "You have unsubscribed from the job search email";
    res.status(200).json({
      status: 200,
      msg,
    });
  } catch (error) {
    next(error);
  }
};

export const iterController = {
  getIters,
  deleteIter,
  receiveMail,
};
