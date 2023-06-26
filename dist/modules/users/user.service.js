"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.getOne = exports.getById = exports.getAll = exports.create = void 0;
const errors_1 = require("../../errors");
const logger_1 = require("../../logger");
const user_model_1 = require("./user.model");
const create = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const userByPhone = yield getOne({ phone: info.phone });
    if (userByPhone) {
        throw new errors_1.ApiError(400, "phone already taken");
    }
    const user = user_model_1.User.build(info);
    return user.save();
});
exports.create = create;
const getAll = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = queries;
    // Create a date range filter object
    const dateRangeFilter = {};
    if (startDate) {
        dateRangeFilter["$gte"] = new Date(startDate);
    }
    if (endDate) {
        dateRangeFilter["$lte"] = new Date(endDate);
    }
    console.log(dateRangeFilter.$gte);
    // Add the date range filter to the other filters
    let finalFilters = Object.assign({}, filters);
    if (startDate || endDate) {
        finalFilters = Object.assign(Object.assign({}, finalFilters), { createdAt: dateRangeFilter });
    }
    const users = yield user_model_1.User.find(finalFilters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield user_model_1.User.countDocuments(finalFilters);
    const page = Math.ceil(total / queries.limit);
    return { users, total, page };
});
exports.getAll = getAll;
const getOne = (info) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findOne(info);
});
exports.getOne = getOne;
const getById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findById(_id);
});
exports.getById = getById;
const updateById = (_id, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getById(_id);
    logger_1.loger.debug(user);
    if (!user) {
        throw new errors_1.ApiError(404, "User not found");
    }
    Object.assign(user, updateBody);
    return user.save();
});
exports.updateById = updateById;
//# sourceMappingURL=user.service.js.map