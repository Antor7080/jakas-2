"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const joi_1 = __importDefault(require("joi"));
const feedReqValidation = joi_1.default.object({
    hensInfo: joi_1.default.object({
        batch_no: joi_1.default.number().required(),
        shed_no: joi_1.default.number().required(),
        hensTypes: joi_1.default.string().required(),
        hensCount: joi_1.default.number().required(),
        averageWeight: joi_1.default.number().required(),
        age: joi_1.default.number().required(),
        Id: joi_1.default.string().required(),
    }),
    feeds: joi_1.default.array().items(joi_1.default.object({
        feedType: joi_1.default.string().required(),
        feedName: joi_1.default.string().required(),
        feedQuantity: joi_1.default.number().required(),
        feedUnit: joi_1.default.string().required(),
        feedUnitPrice: joi_1.default.number().allow(null, ""),
        feedPrice: joi_1.default.number().allow(null, ""),
    })),
    feedDate: joi_1.default.string(),
    dealerId: joi_1.default.string().required(),
}).options({ abortEarly: false });
const feedUpdateValidation = joi_1.default.object({
    feeds: joi_1.default.array().items(joi_1.default.object({
        feedType: joi_1.default.string(),
        feedName: joi_1.default.string(),
        feedQuantity: joi_1.default.number(),
        feedUnit: joi_1.default.string(),
        feedUnitPrice: joi_1.default.number().required(),
        feedPrice: joi_1.default.number().required(),
    })),
    feedTotalPrice: joi_1.default.number(),
});
const validator = (req, res, next) => {
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
//# sourceMappingURL=feed.validation.js.map