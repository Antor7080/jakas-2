"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.farmerInfoValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const farmerInfoSchemaValidation = joi_1.default.object({
    batch_no: joi_1.default.number().required(),
    shed_no: joi_1.default.number().required(),
    hensTypes: joi_1.default.string().allow(null, ""),
    hensCount: joi_1.default.number().allow(null, ""),
    hensPrice: joi_1.default.number().allow(null, ""),
    batchStartDate: joi_1.default.string().allow(null, ""),
    sprayed_disinfectants: joi_1.default.boolean().allow(null, ""),
    bleaching_cleaned: joi_1.default.boolean().allow(null, ""),
    isFumigation: joi_1.default.boolean().allow(null),
    isBufferZone: joi_1.default.boolean().allow(null),
    isFootBaths: joi_1.default.boolean().allow(null),
    entrySpary: joi_1.default.boolean().allow(null),
    isDeadAnimal: joi_1.default.boolean().allow(null),
    company_name: joi_1.default.string().allow(null, ""),
    isGovt: joi_1.default.boolean().allow(null),
    other: joi_1.default.string().allow(null, ""),
    food_company_name: joi_1.default.string().optional().allow(null, ""),
    other_food_company: joi_1.default.string().optional().allow(null, ""),
    water_test_method: joi_1.default.string().optional().allow(null, ""),
    Probiotics_days: joi_1.default.number().allow(null, ""),
    isWithdrwalFollow: joi_1.default.boolean().allow(null, ""),
    antibiotics_days: joi_1.default.number().allow(null, ""),
    advicer_type: joi_1.default.string().allow(null, ""),
    // prescription: Joi.string().allow(null).optional(),
    DLS_regi_no: joi_1.default.string().allow(null, "").optional(),
    isCertified: joi_1.default.boolean().allow(null, ""),
    is40_42_days: joi_1.default.boolean().allow(null, ""),
    selling_age: joi_1.default.number().allow(null, ""),
    isGrowth_chart_used: joi_1.default.boolean().allow(null, ""),
    growthWeek1: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number()
            .valid(0)
            .meta({ message: "Growth week 1 must be greater than 0" }),
    }),
    growthWeek2: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek3: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek4: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek5: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek6: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek7: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek8: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    growthWeek9: joi_1.default.when("isGrowth_chart_used", {
        is: true,
        then: joi_1.default.number(),
        otherwise: joi_1.default.number().valid(0),
    }),
    wasteRemoval: joi_1.default.string().allow(null, ""),
    average_weight: joi_1.default.number().allow(null, ""),
    weight_count_age: joi_1.default.number().allow(null, ""),
    vaccine: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().allow(null, ""),
        age: joi_1.default.number().allow(null, ""),
        otherVaccineName: joi_1.default.string().allow(null, ""),
    })),
    mortality: joi_1.default.array().items(joi_1.default.object({
        count: joi_1.default.number().allow(null, ""),
        date: joi_1.default.string().allow(null, ""),
        age: joi_1.default.number().allow(null, ""),
    })),
    status: joi_1.default.string().allow(null, ""),
    isWaterTest: joi_1.default.boolean().allow(null),
    safeWater: joi_1.default.boolean().allow(null),
    isPreBiotic: joi_1.default.boolean().allow(null),
    doctorAdvice: joi_1.default.boolean().allow(null),
    dlsRegistered: joi_1.default.boolean().allow(null),
    other_water_test: joi_1.default.string().allow(null, ""),
    farmerId: joi_1.default.string().required(),
});
const farmerInfoValidator = (req, res, next) => {
    try {
        const { error } = farmerInfoSchemaValidation.validate(req.body, {
            abortEarly: false,
            allowUnknown: true,
        });
        if (error) {
            next(error);
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.farmerInfoValidator = farmerInfoValidator;
//# sourceMappingURL=batch.validation.js.map