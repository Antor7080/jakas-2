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
exports.updateById = exports.getOne = exports.getById = exports.getAll = exports.findOneByQuery = exports.create = void 0;
const errors_1 = require("../../errors");
const logger_1 = require("../../logger");
const farmerInfo_model_1 = require("./farmerInfo.model");
const create = (cxtObje) => __awaiter(void 0, void 0, void 0, function* () {
    const farmerInfo = farmerInfo_model_1.FarmerInfo.build(cxtObje);
    return farmerInfo.save();
});
exports.create = create;
const getOne = (cxtObje) => __awaiter(void 0, void 0, void 0, function* () {
    return farmerInfo_model_1.FarmerInfo.findOne(cxtObje);
});
exports.getOne = getOne;
const getAll = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const farmerInfo = yield farmerInfo_model_1.FarmerInfo.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield farmerInfo_model_1.FarmerInfo.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, farmerInfo };
});
exports.getAll = getAll;
const getById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return farmerInfo_model_1.FarmerInfo.findById(_id);
});
exports.getById = getById;
const findOneByQuery = (query) => {
    return farmerInfo_model_1.FarmerInfo.findOne(query);
};
exports.findOneByQuery = findOneByQuery;
/**
 *
 * @param _id
 * @param updateBody
 * @returns
 * `updateBody` is an object that contains the fields that you want to update
 *
 */
const updateById = (_id, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const farmerInfo = yield getById(_id);
    logger_1.loger.debug(farmerInfo);
    if (!farmerInfo) {
        throw new errors_1.ApiError(404, "FarmerInfo not found");
    }
    Object.assign(farmerInfo, updateBody);
    return farmerInfo.save();
});
exports.updateById = updateById;
//# sourceMappingURL=farmerInfo.service.js.map