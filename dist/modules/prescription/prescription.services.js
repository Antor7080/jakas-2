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
exports.givePrescription = exports.getAll = exports.getById = exports.getOneQuery = exports.create = void 0;
const prescription_model_1 = require("./prescription.model");
const create = (prescription) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prescription_model_1.PrescriptionModel.create(prescription);
});
exports.create = create;
const getOneQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prescription_model_1.PrescriptionModel.findOne(query).notDeleted();
});
exports.getOneQuery = getOneQuery;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prescription_model_1.PrescriptionModel.findById(id).notDeleted();
});
exports.getById = getById;
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
    const prescription = yield prescription_model_1.PrescriptionModel.find(finalFilters)
        .notDeleted()
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield prescription_model_1.PrescriptionModel.find(finalFilters)
        .notDeleted()
        .countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, prescription };
});
exports.getAll = getAll;
const givePrescription = (id, updateBody, audit_trails) => __awaiter(void 0, void 0, void 0, function* () {
    const { updated_by, updated_detail } = audit_trails;
    const updatePrescription = prescription_model_1.PrescriptionModel.findByIdAndUpdate({
        _id: id,
    }, {
        $set: Object.assign(Object.assign({}, updateBody), { "audit_trails.updated_at": new Date(), "audit_trails.updated_by": updated_by, "audit_trails.updated_detail": updated_detail }),
    }, {
        new: true,
    }).notDeleted();
    return updatePrescription;
});
exports.givePrescription = givePrescription;
//# sourceMappingURL=prescription.services.js.map