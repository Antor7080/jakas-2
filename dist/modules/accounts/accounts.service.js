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
exports.getAll = exports.findOneByQuery = exports.findById = exports.addExpenseOrIncome = void 0;
const accounts_model_1 = require("./accounts.model");
const addExpenseOrIncome = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield accounts_model_1.Account.create(info);
    return account;
});
exports.addExpenseOrIncome = addExpenseOrIncome;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield accounts_model_1.Account.findById(id).notDeleted();
    return account;
});
exports.findById = findById;
const findOneByQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const account = yield accounts_model_1.Account.findOne(query).notDeleted();
    return account;
});
exports.findOneByQuery = findOneByQuery;
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
    const accounts = yield accounts_model_1.Account.find(finalFilters)
        .notDeleted()
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield accounts_model_1.Account.find(finalFilters)
        .notDeleted()
        .countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, accounts };
});
exports.getAll = getAll;
;
//# sourceMappingURL=accounts.service.js.map