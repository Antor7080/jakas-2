"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const joi_1 = __importDefault(require("joi"));
const prescriptionRequestValidation = joi_1.default.object({
    hensInfo: joi_1.default.object({
        batch_no: joi_1.default.number().required(),
        shed_no: joi_1.default.number().required(),
        hensTypes: joi_1.default.string().required(),
        hensCount: joi_1.default.number().required(),
        averageWeight: joi_1.default.number().required(),
        age: joi_1.default.number().required(),
        Id: joi_1.default.string().required(),
    }),
    doctorId: joi_1.default.string().required(),
    farmerInfo: joi_1.default.object({
        name: joi_1.default.string(),
        phone: joi_1.default.string(),
        zilla: joi_1.default.string(),
        upazilla: joi_1.default.string(),
        union: joi_1.default.string(),
        village: joi_1.default.string(),
        Id: joi_1.default.string(),
    }),
    symptoms: joi_1.default.object({
        beakArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        wattleArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        combArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        eyeArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        earArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        headArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        featherArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        droppingArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        respiratoryArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        nervousArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        locomotoryArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        alimentaryArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        skinArr: joi_1.default.array().items(joi_1.default.string().allow(null, "")),
        medicalComplaints: joi_1.default.string().allow(null, ""),
    }),
    medicines: joi_1.default.array().items(joi_1.default.object({
        medicineName: joi_1.default.string(),
        medicineQuantity: joi_1.default.number().allow(null, ""),
        medicineUnitPrice: joi_1.default.number().allow(null, ""),
        medicinePrice: joi_1.default.number().allow(null, ""),
        medicineType: joi_1.default.string().allow(null, ""),
        medicineDose: joi_1.default.string().allow(null, ""),
        medicineDuration: joi_1.default.string().allow(null, ""),
        medicineNote: joi_1.default.string().allow(null, ""),
    })),
    medicineTotalPrice: joi_1.default.number().allow(null, ""),
    diseaseName: joi_1.default.string().allow(null, ""),
    adviceNote: joi_1.default.string().allow(null, ""),
    followupDate: joi_1.default.date().allow(null, ""),
});
const prescriptionUpdateValidation = joi_1.default.object({
    medicines: joi_1.default.array().items(joi_1.default.object({
        medicineName: joi_1.default.string().required(),
        medicineQuantity: joi_1.default.number().allow(null, ""),
        medicineUnitPrice: joi_1.default.number().allow(null, ""),
        medicinePrice: joi_1.default.number().allow(null, ""),
        medicineType: joi_1.default.string().allow(null, ""),
        medicineDose: joi_1.default.string().allow(null, ""),
        medicineDuration: joi_1.default.number().allow(null, ""),
        medicineNote: joi_1.default.string().allow(null, ""),
    })),
    medicineTotalPrice: joi_1.default.number().allow(null, ""),
    prescriptionNote: joi_1.default.string().allow(null, ""),
    diseaseName: joi_1.default.string().allow(null, ""),
    adviceNote: joi_1.default.string().allow(null, ""),
    followupDate: joi_1.default.date().allow(null, ""),
});
const validator = (req, res, next) => {
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
        }
        else {
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.validator = validator;
//# sourceMappingURL=prescription.validation.js.map