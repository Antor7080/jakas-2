import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
const feedReqValidation = Joi.object({
  hensInfo: Joi.object({
    batch_no: Joi.number().required(),
    shed_no: Joi.number().required(),
    hensTypes: Joi.string().required(),
    hensCount: Joi.number().required(),
    averageWeight: Joi.number().required(),
    age: Joi.number().required(),
    Id: Joi.string().required(),
  }),
 
  feeds: Joi.array().items(
    Joi.object({
      feedType: Joi.string().required(),
      feedName: Joi.string().required(),
      feedQuantity: Joi.number().required(),
      feedUnit: Joi.string().required(),
      feedUnitPrice: Joi.number().allow(null, ""),
      feedPrice: Joi.number().allow(null, ""),
    })
  ),
  feedDate: Joi.string(), // which date feed is needed
  dealerId: Joi.string().required(),
}).options({ abortEarly: false });

const feedUpdateValidation = Joi.object({

   
    feeds: Joi.array().items(
      Joi.object({
        feedType: Joi.string(),
        feedName: Joi.string(),
        feedQuantity: Joi.number(),
        feedUnit: Joi.string(),
        feedUnitPrice: Joi.number().required(),
        feedPrice: Joi.number().required(),
      })
    ),
    feedTotalPrice: Joi.number(),
  })


  const validator = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (Object.keys(req.body).length === 0) {
        res
          .status(200)
          .send({ success: false, data: { message: "Body is required" } });
      }
      let validationSchema = feedReqValidation;
      if (req.method === "PUT") {
        validationSchema = feedUpdateValidation;
      }
      const { error, value } = validationSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        errors: {
          wrap: {
            label: "",
          },
        },
      });
      if (!error) {
        next();
      } else {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };
  
  export { validator };