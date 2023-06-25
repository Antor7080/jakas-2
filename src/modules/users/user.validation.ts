import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const objectToVallidate = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  role: Joi.string().allow(null, ""),
  phone: Joi.string().required(),
  zilla: Joi.string().allow(null, ""),
  upazilla: Joi.string().allow(null, ""),
  union: Joi.string().allow(null, ""),
  village: Joi.string().allow(null, ""),
  
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = objectToVallidate.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });
    if (error) {
      next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { validator as userValidator };
