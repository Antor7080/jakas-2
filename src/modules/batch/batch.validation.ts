import { NextFunction, Request, Response } from "express";
import Joi from "joi";
const farmerInfoSchemaValidation = Joi.object({
  batch_no: Joi.number().required(),
  shed_no: Joi.number().required(),
  hensTypes: Joi.string().allow(null, ""),
  hensCount: Joi.number().allow(null, ""),
  hensPrice: Joi.number().allow(null, ""),
  batchStartDate: Joi.string().allow(null, ""),
  sprayed_disinfectants: Joi.boolean().allow(null, ""),
  bleaching_cleaned: Joi.boolean().allow(null, ""),
  isFumigation: Joi.boolean().allow(null),
  isBufferZone: Joi.boolean().allow(null),
  isFootBaths: Joi.boolean().allow(null),
  entrySpary: Joi.boolean().allow(null),
  isDeadAnimal: Joi.boolean().allow(null),
  company_name: Joi.string().allow(null, ""),
  isGovt: Joi.boolean().allow(null),
  other: Joi.string().allow(null, ""),
  food_company_name: Joi.string().optional().allow(null, ""),
  other_food_company: Joi.string().optional().allow(null, ""),
  water_test_method: Joi.string().optional().allow(null, ""),
  Probiotics_days: Joi.number().allow(null, ""),
  isWithdrwalFollow: Joi.boolean().allow(null, ""),
  antibiotics_days: Joi.number().allow(null, ""),
  advicer_type: Joi.string().allow(null, ""),
  // prescription: Joi.string().allow(null).optional(),
  DLS_regi_no: Joi.string().allow(null, "").optional(),
  isCertified: Joi.boolean().allow(null, ""),

  is40_42_days: Joi.boolean().allow(null, ""),
  selling_age: Joi.number().allow(null, ""),
  isGrowth_chart_used: Joi.boolean().allow(null, ""),
  growthWeek1: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number()
      .valid(0)
      .meta({ message: "Growth week 1 must be greater than 0" }),
  }),
  growthWeek2: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),

  growthWeek3: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek4: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek5: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek6: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek7: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek8: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  growthWeek9: Joi.when("isGrowth_chart_used", {
    is: true,
    then: Joi.number(),
    otherwise: Joi.number().valid(0),
  }),
  wasteRemoval: Joi.string().allow(null, ""),
  average_weight: Joi.number().allow(null, ""),
  weight_count_age: Joi.number().allow(null, ""),
  vaccine: Joi.array().items(
    Joi.object({
      name: Joi.string().allow(null, ""),
      age: Joi.number().allow(null, ""),
      otherVaccineName: Joi.string().allow(null, ""),
    })
  ),
  mortality: Joi.array().items(
    Joi.object({
      count: Joi.number().allow(null, ""),
      date: Joi.string().allow(null, ""),
      age: Joi.number().allow(null, ""),
    })
  ),
  status: Joi.string().allow(null, ""),
  isWaterTest: Joi.boolean().allow(null),
  safeWater: Joi.boolean().allow(null),
  isPreBiotic: Joi.boolean().allow(null),
  doctorAdvice: Joi.boolean().allow(null),
  dlsRegistered: Joi.boolean().allow(null),
  other_water_test: Joi.string().allow(null, ""),
  farmerId: Joi.string().required(),
});

const farmerInfoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = farmerInfoSchemaValidation.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { farmerInfoValidator as farmerInfoValidator };
