import mongo from "mongoose";
import { HttpError } from "../utils";
import { CVService, ITerService } from "../services";
import { CV } from "../models";
const cvService = new CVService();
const iterService = new ITerService();

const createCV = async (req, res, next) => {
  const { _id } = req.user;
  let { skill, softSkill, experience, description, birthday, image } = req.body;
  try {
    const cvExist = await CV.findOne({ iterId: _id });
    if (cvExist) {
      throw new HttpError("You already have CV", 400);
    }
    const user = await iterService.getIter(_id);
    if (!user) {
      throw new HttpError("Iter not found", 400);
    }
    const date = new Date(birthday.split("/").reverse().join("/"));
    if (date > new Date()) {
      throw new HttpError("Birthday cannot greater than now", 400);
    }
    const { email, name } = user;
    const data = {
      iterId: _id,
      skill,
      name: name,
      softSkill,
      experience,
      description,
      email,
      birthday,
      image,
    };
    await cvService.create(data);
    res.status(200).json({
      status: 200,
      msg: "Create cv successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getCVByIter = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const cv = await cvService.getCVByUser(_id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      cv,
    });
  } catch (error) {
    next(error);
  }
};

const getCV = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongo.Types.ObjectId.isValid(id)) {
      throw new HttpError("id is invalid", 400);
    }
    const cv = await cvService.getCV(id);
    res.status(200).json({
      status: 200,
      msg: "Success",
      cv,
    });
  } catch (error) {
    next(error);
  }
};

const updateCV = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const { birthday } = req.body;
    const date = new Date(birthday.split("/").reverse().join("/"));
    if (date > new Date()) {
      throw new HttpError("birthday cannot greater than now", 400);
    }
    if (!(await cvService.update(_id, req.body))) {
      throw new HttpError("Cv not found", 400);
    }

    res.status(200).json({
      status: 200,
      msg: "Update success",
    });
  } catch (error) {
    next(error);
  }
};

export const cvController = { createCV, getCVByIter, getCV, updateCV };
