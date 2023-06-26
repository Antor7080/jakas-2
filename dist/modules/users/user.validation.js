"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const objectToVallidate = joi_1.default.object({
    name: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: joi_1.default.string().allow(null, ""),
    phone: joi_1.default.string().required(),
    zilla: joi_1.default.string().allow(null, ""),
    upazilla: joi_1.default.string().allow(null, ""),
    union: joi_1.default.string().allow(null, ""),
    village: joi_1.default.string().allow(null, ""),
});
const validator = (req, res, next) => {
    try {
        const { error } = objectToVallidate.validate(req.body, {
            abortEarly: false,
            allowUnknown: true
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
exports.userValidator = validator;
//# sourceMappingURL=user.validation.js.map