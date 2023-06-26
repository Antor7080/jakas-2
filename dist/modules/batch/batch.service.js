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
exports.updateById = exports.batchCount = exports.getOne = exports.getById = exports.getAll = exports.fineMany = exports.findOneByQuery = exports.create = void 0;
const logger_1 = require("../../logger");
const batch_model_1 = require("./batch.model");
const create = (cxtObje) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = new batch_model_1.BatchInfo(cxtObje);
    return yield batch.save();
});
exports.create = create;
const getOne = (cxtObje) => __awaiter(void 0, void 0, void 0, function* () {
    return batch_model_1.BatchInfo.findOne(cxtObje);
});
exports.getOne = getOne;
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
    // Add the date range filter to the other filters
    let finalFilters = Object.assign({}, filters);
    if (startDate || endDate) {
        finalFilters = Object.assign(Object.assign({}, finalFilters), { createdAt: dateRangeFilter });
    }
    const batch = yield batch_model_1.BatchInfo.find(finalFilters)
        .notDeleted()
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield batch_model_1.BatchInfo.find(finalFilters)
        .notDeleted()
        .countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, batch };
});
exports.getAll = getAll;
const getById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return batch_model_1.BatchInfo.findById(_id);
});
exports.getById = getById;
const batchCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ userId });
    const total = yield batch_model_1.BatchInfo.find({
        "addedBy": userId,
    }).notDeleted().countDocuments();
    return total;
});
exports.batchCount = batchCount;
const findOneByQuery = (query) => {
    return batch_model_1.BatchInfo.findOne(query).notDeleted();
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
const updateById = (_id, updateBody, audit_trail) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.loger.info("updateById");
    let info = Object.assign({}, updateBody);
    if (audit_trail) {
        info = Object.assign(Object.assign({}, updateBody), { "audit_trails.updated_at": new Date(), "audit_trails.updated_by": audit_trail.updated_by, "audit_trails.updated_detail": audit_trail.updated_detail });
    }
    const updateBatch = batch_model_1.BatchInfo.findByIdAndUpdate({
        _id,
    }, {
        $set: Object.assign({}, info),
    }, {
        new: true,
    }).notDeleted();
    return updateBatch;
});
exports.updateById = updateById;
const fineMany = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield batch_model_1.BatchInfo.find(query).notDeleted();
});
exports.fineMany = fineMany;
//# sourceMappingURL=batch.service.js.map