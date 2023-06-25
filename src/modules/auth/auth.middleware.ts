import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors";
import { getJwtInfo } from "../../helpers/jwt";
import { notAccepted, unAuthorized } from "../../helpers/responseHandler";
import { userService } from "../users";

const authorization = (roles: string[]): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerAuthString: string | undefined = req.header("Authorization");

      if (!bearerAuthString) {
        throw new ApiError(notAccepted(), "Authorization Header is Missing");
      }
      const token: string = bearerAuthString.replace("Bearer ", "");
      let userId = <any>getJwtInfo(token);
      if (!userId) {
        throw new ApiError(unAuthorized(), "Unauthorized");
      }

      const user = await userService.getById(userId);
     
      if (!user) {
        throw new ApiError(unAuthorized(), "Unauthorized User");
      }

      if (!roles.includes(user.role)) {
        throw new ApiError(unAuthorized(), "Unauthorized User");
      }
      // bind user information into res.locals object
      res.locals["user"] = user;
     
      return next();
    } catch (error) {
      return next(error);
    }
  };
};
const isLoggedin1 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerAuthString: string | undefined = req.header("Authorization");

    if (!bearerAuthString) {
      throw new ApiError(notAccepted(), "Authorization Header is Missing");
    }
    const token: string = bearerAuthString.replace("Bearer ", "");
    let userId = <any>getJwtInfo(token);
    if (!userId) {
      throw new ApiError(unAuthorized(), "Unauthorized");
    }

    const user = await userService.getById(userId);

    if (!user) {
      throw new ApiError(unAuthorized(), "Unauthorized User");
    }

    // bind user information into res.locals object
    res.locals["user"] = user;
    return next();
  } catch (error) {
    next(error);
  }
};

export { authorization as isLoggedin };
