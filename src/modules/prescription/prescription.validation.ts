import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const prescriptionRequestValidation = Joi.object({
  hensInfo: Joi.object({
    batch_no: Joi.number().required(),
    shed_no: Joi.number().required(),
    hensTypes: Joi.string().required(),
    hensCount: Joi.number().required(),
    averageWeight: Joi.number().required(),
    age: Joi.number().required(),
    Id: Joi.string().required(),
  }),
  doctorId: Joi.string().required(),
  farmerInfo: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    zilla: Joi.string(),
    upazilla: Joi.string(),
    union: Joi.string(),
    village: Joi.string(),
    Id: Joi.string(),
  }),

  symptoms: Joi.object({
    beakArr: Joi.array().items(Joi.string().allow(null, "")),
    wattleArr: Joi.array().items(Joi.string().allow(null, "")),
    combArr: Joi.array().items(Joi.string().allow(null, "")),
    eyeArr: Joi.array().items(Joi.string().allow(null, "")),
    earArr: Joi.array().items(Joi.string().allow(null, "")),
    headArr: Joi.array().items(Joi.string().allow(null, "")),
    featherArr: Joi.array().items(Joi.string().allow(null, "")),
    droppingArr: Joi.array().items(Joi.string().allow(null, "")),
    respiratoryArr: Joi.array().items(Joi.string().allow(null, "")),
    nervousArr: Joi.array().items(Joi.string().allow(null, "")),
    locomotoryArr: Joi.array().items(Joi.string().allow(null, "")),
    alimentaryArr: Joi.array().items(Joi.string().allow(null, "")),
    skinArr: Joi.array().items(Joi.string().allow(null, "")),
    medicalComplaints: Joi.string().allow(null, ""),
  }),
  medicines: Joi.array().items(
    Joi.object({
      medicineName: Joi.string(),
      medicineQuantity: Joi.number().allow(null, ""),
      medicineUnitPrice: Joi.number().allow(null, ""),
      medicinePrice: Joi.number().allow(null, ""),
      medicineType: Joi.string().allow(null, ""),
      medicineDose: Joi.string().allow(null, ""),
      medicineDuration: Joi.string().allow(null, ""),
      medicineNote: Joi.string().allow(null, ""),
    })
  ),
  medicineTotalPrice: Joi.number().allow(null, ""),
  diseaseName: Joi.string().allow(null, ""),
  adviceNote: Joi.string().allow(null, ""),
  followupDate: Joi.date().allow(null, ""),
});

const prescriptionUpdateValidation = Joi.object({
  medicines: Joi.array().items(
    Joi.object({
      medicineName: Joi.string().required(),
      medicineQuantity: Joi.number().allow(null, ""),
      medicineUnitPrice: Joi.number().allow(null, ""),
      medicinePrice: Joi.number().allow(null, ""),
      medicineType: Joi.string().allow(null, ""),
      medicineDose: Joi.string().allow(null, ""),
      medicineDuration: Joi.number().allow(null, ""),
      medicineNote: Joi.string().allow(null, ""),
    })
  ),
  medicineTotalPrice: Joi.number().allow(null, ""),
  prescriptionNote: Joi.string().allow(null, ""),
  diseaseName: Joi.string().allow(null, ""),
  adviceNote: Joi.string().allow(null, ""),
  followupDate: Joi.date().allow(null, ""),
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res
        .status(200)
        .send({ success: false, data: { message: "Body is required" } });
    }
    let validationSchema = prescriptionRequestValidation;
    if (req.method === "PUT") {
      validationSchema = prescriptionUpdateValidation;
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
