import bcrypt from "bcryptjs";
import config from "config";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ApiError } from "../../errors";
import { userService } from "../users";

import { unAuthorized, unProcessable } from "../../helpers/responseHandler";

const JWT_SECRET = config.get<string>("jwt.secret");
const JWT_EXPIRES_IN = config.get<string>("jwt.accessTokenExpiresIn");

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password) {
      throw new ApiError(unProcessable(), "Phone No or Password is Missing");
    }

    let user = await userService.getOne({ phone: phone });
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new ApiError(unAuthorized(), "invalid phone or password");
    }

    const token = jsonwebtoken.sign(
      { id: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: `${JWT_EXPIRES_IN}d` }
    );
    // const userRes = resTransformer(user);
    return res.status(200).send({
      success: true,
      data: {
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          zilla: user.zilla,
          upazilla: user.upazilla,
          union: user.union,
          village: user.village,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUser = res.locals?.user;
    const { password } = authUser;

    if (!req.body.new_password || !req.body.old_password) {
      throw new ApiError(unProcessable(), "Password or Phone Missing");
    }

    if (!bcrypt.compareSync(req.body.old_password, password)) {
      throw new ApiError(unAuthorized(), "Unautorized Customer");
    }

    if (bcrypt.compareSync(req.body.new_password, password)) {
      throw new ApiError(
        unProcessable(),
        "New Password cannot be the same as Old Password"
      );
    }

    authUser.password = req.body.new_password;
    const result = authUser.save();

    return res.ok({ phone: result?.phone });
  } catch (error) {
    next(error);
  }
};

export { login as loginUser, changePassword };
