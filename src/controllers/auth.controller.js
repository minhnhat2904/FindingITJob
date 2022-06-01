import {
  AuthThenticationService,
  CompanyService,
  ITerService,
} from "../services";
import { HttpError, tokenEncode, generateOTP, sendEmail } from "../utils";
import bcrypt from "bcryptjs";
import { Account, Company, ITer, CodeReset } from "../models";

const authService = new AuthThenticationService();
const companyService = new CompanyService();
const iterService = new ITerService();

const login = async (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    const user = await authService.getAccount(email);
    if (!user) {
      throw new HttpError("Email have not already registered", 400);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpError("Password is uncorrect", 400);
    }

    const role = user.role;
    let accountId = user._id;
    let name;
    let image;

    if (role == "iter") {
      const info = await ITer.findOne({ accountId });
      name = info.name;
      image = info.image;
    } else if (role == "company") {
      const info = await Company.findOne({ accountId });
      name = info.name;
      image = info.image;
    }

    let data = {
      email: user.email,
      _id: user._id,
      role: user.role,
    };

    const token = tokenEncode(data);

    res.status(200).json({
      status: 200,
      msg: "Success",
      token,
      user: {
        role: data.role,
        name,
        image,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerITer = async (req, res, next) => {
  let { email } = req.body;
  email = email.toLowerCase();

  try {
    const user = await authService.getAccount(email);
    if (user) {
      throw new HttpError("The email is existed", 400);
    }

    await authService.register(req.body, "iter");

    res.status(200).json({
      status: 200,
      msg: "Register success",
    });
  } catch (error) {
    next(error);
  }
};

const registerCompany = async (req, res, next) => {
  let { email } = req.body;
  email = email.toLowerCase();

  try {
    const user = await authService.getAccount(email);
    if (user) {
      throw new HttpError("The email is existed", 400);
    }

    await authService.register(req.body, "company");

    res.status(200).json({
      status: 200,
      msg: "Register success",
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { email } = req.user;
  try {
    let user = await authService.getAccount(email);
    if (!user) {
      throw new HttpError("User not found", 400);
    }
    if (!(await authService.updatePassword(email, password, newPassword))) {
      throw new HttpError("Password is incorrect", 400);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const requestResetPassword = async (req, res, next) => {
  let { email } = req.body;
  try {
    email = email.toLowerCase();
    const user = await Account.findOne({ email, deleted_flag: false });
    if (!user) {
      throw new HttpError("Email does not exist in the system", 400);
    }
    const code = generateOTP();
    await sendEmail(code, email);
    await Promise.all([
      CodeReset.deleteMany({ email }),
      CodeReset.create({ email, code, accountId: user._id }),
    ]);
    res.status(200).json({
      status: 200,
      msg: "We sent code to your email, the code only lasts for 5 minutes",
    });
  } catch (error) {
    next(error);
  }
};

const confirmCode = async (req, res, next) => {
  let { email, code } = req.body;
  try {
    email = email.toLowerCase();
    const existCode = await CodeReset.findOne({ email, code });
    if (!existCode) {
      throw new HttpError("Your code is incorrect", 400);
    }
    res.status(200).json({
      status: 200,
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const changePasswordReset = async (req, res, next) => {
  let { email, code, password } = req.body;
  try {
    email = email.toLowerCase();
    const isExistCode = await CodeReset.findOne({ email, code });
    if (!isExistCode) {
      throw new HttpError("Fail", 400);
    }
    const hash = await bcrypt.hash(password, 12);
    await Promise.all([
      Account.findByIdAndUpdate(
        { _id: isExistCode.accountId },
        { password: hash }
      ),
      CodeReset.findByIdAndDelete({ _id: isExistCode._id }),
    ]);
    res.status(200).json({
      status: 200,
      msg: "Password has updated",
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  const { role, _id } = req.user;
  try {
    let user = null;
    if (role == "company") {
      user = await companyService.getCompany(_id);
    } else if (role == "iter") {
      user = await iterService.getIter(_id);
    }
    if (!user) {
      throw new HttpError("user not found", 400);
    }

    res.status(200).json({
      status: 200,
      msg: "Success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { role, _id } = req.user;
  let user = null;
  if (role == "company") {
    user = await companyService.getCompany(_id);
  } else if (role == "iter") {
    user = await iterService.getIter(_id);
  }
  if (!user) {
    throw new HttpError("User not found", 400);
  }

  if (role == "company") {
    await companyService.update(_id, req.body);
  } else if (role == "iter") {
    await iterService.update(_id, req.body);
  }
  res.status(200).json({
    status: 200,
    msg: "Success",
  });
};

const authController = {
  login,
  registerITer,
  registerCompany,
  updatePassword,
  requestResetPassword,
  confirmCode,
  changePasswordReset,
  profile,
  updateProfile,
};

export default authController;
