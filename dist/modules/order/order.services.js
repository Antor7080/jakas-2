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
exports.updateOrderById = exports.getOneByQuery = exports.getByOrderId = exports.getAllOrder = exports.createOrder = void 0;
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_model_1.OrderModel(order);
    return newOrder.save();
});
exports.createOrder = createOrder;
const getAllOrder = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
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
    const order = yield order_model_1.OrderModel.find(finalFilters)
        .notDeleted()
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    const total = yield order_model_1.OrderModel.find(finalFilters).notDeleted().countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, order };
});
exports.getAllOrder = getAllOrder;
const getByOrderId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.OrderModel.findById(id).notDeleted();
});
exports.getByOrderId = getByOrderId;
const getOneByQuery = (cxtObje) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.findOne(cxtObje).notDeleted();
});
exports.getOneByQuery = getOneByQuery;
const updateOrderById = (id, order, audit_trails) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(order);
    const { updated_by, updated_detail } = audit_trails;
    const updatedOrder = yield order_model_1.OrderModel.findByIdAndUpdate({
        _id: id,
    }, {
        $set: Object.assign(Object.assign({}, order), { "audit_trails.updated_at": new Date(), "audit_trails.updated_by": updated_by, "audit_trails.updated_detail": updated_detail })
    }, {
        new: true,
    });
    return updatedOrder;
});
exports.updateOrderById = updateOrderById;
//# sourceMappingURL=order.services.js.map