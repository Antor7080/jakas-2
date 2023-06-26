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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getOneOrder = exports.getAllOrderForAuthUser = exports.create = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const filterOption_1 = require("../../helpers/filterOption");
const batch_service_1 = require("../batch/batch.service");
const batch_transformer_1 = require("../batch/batch.transformer");
const order_services_1 = require("./order.services");
const res_transformer_1 = require("./res.transformer");
/**
 *
 * @objective create new order
 * @route POST /order/create
 * @access private
 * @description create new order
 *@body {
    "batchId": "647d7308b4be402d335a0467",
    "hensCount": 574
}

 */
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { hensCount } = req.body;
        const batches = yield (0, batch_service_1.getById)(req.body.batchId);
        if (!batches)
            throw new errors_1.ApiError(404, "Batch Info Not Found");
        // check if batch is ready for order
        if (batches.status !== "বিক্রয়যোগ্য")
            throw new errors_1.ApiError(400, "unable to order");
        const batchInfo = (0, batch_transformer_1.resTransformer)(batches, user.role);
        // farmer info
        const farmerInfo = batchInfo.farmer;
        // buyer info
        const buyer = {
            name: user.name,
            phone: user.phone,
            Id: user._id,
            zilla: user.zilla,
            upazilla: user.upazilla,
            union: user.union,
            village: user.village,
        };
        // hens info
        const hensInfo = {
            batch_no: batchInfo.batch_no,
            shed_no: batchInfo.shed_no,
            hensTypes: batchInfo.hensTypes,
            hensCount: hensCount ? hensCount : batchInfo.hensCount,
            averageWeight: batchInfo.average_weight,
            age: batchInfo.age,
            Id: batchInfo._id,
        };
        const info = Object.assign(Object.assign({}, req.body), { hensInfo: hensInfo, farmerInfo, buyer: buyer, addedBy: user._id, agent: batchInfo.agent, audit_trails: {
                created_by: user._id,
                created_at: new Date(),
                created_detail: `Ordered By ${user.name} (${user.phone})`,
            } });
        const order = yield (0, order_services_1.createOrder)(info);
        const transormedOrder = (0, res_transformer_1.resTransformer)(order);
        // update batch status
        yield (0, batch_service_1.updateById)(req.body.batchId, { status: "অর্ডারকৃত" });
        return res.created(transormedOrder, "Ordered successfully");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.create = create;
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //status update
    const user = res.locals.user;
    const orderId = new mongoose_1.default.Types.ObjectId(req.params.id);
    if (!req.body.status)
        throw new errors_1.ApiError(400, "Status is required");
    let batchStatus = "";
    if (req.body.status === "সম্পন্ন") {
        batchStatus = "সম্পূর্ণ বিক্রি হয়েছে";
    }
    if (req.body.status === "বাতিল") {
        batchStatus = "বিক্রয়যোগ্য";
    }
    try {
        const audit_trails = {
            updated_by: user._id,
            updated_detail: ` status change by ${user.name} (${user.phone})`,
        };
        const order = yield (0, order_services_1.updateOrderById)(orderId, req.body, audit_trails);
        if (!order)
            throw new errors_1.ApiError(404, "Order not found");
        // update batch status
        yield (0, batch_service_1.updateById)(order.hensInfo.Id, { status: batchStatus }, audit_trails);
        const transormedOrder = (0, res_transformer_1.resTransformer)(order);
        return res.ok(transormedOrder, "Updated successfully");
    }
    catch (error) { }
});
exports.updateOrder = updateOrder;
const getAllOrderForAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        let filtersWithAuthUser = Object.assign({}, filters);
        if (user.role === "buyer") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "buyer.Id": user._id });
        }
        if (user.role === "farmer") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "farmerInfo.Id": user._id });
        }
        if (user.role === "agent") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "agent.Id": user._id });
        }
        const { total, page, order } = yield (0, order_services_1.getAllOrder)(filtersWithAuthUser, queries);
        if (total < 1) {
            return res.ok({ total, page, order }, "No order found");
        }
        const orderTransformer = (0, res_transformer_1.resTransformer)(order);
        return res.ok({ total, page, order: orderTransformer }, "All order");
    }
    catch (error) {
        next(error);
    }
});
exports.getAllOrderForAuthUser = getAllOrderForAuthUser;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const order = yield (0, order_services_1.getByOrderId)(orderId);
        if (!order)
            throw new errors_1.ApiError(404, "Order not found");
        const orderTransformer = (0, res_transformer_1.resTransformer)(order);
        return res.ok(orderTransformer, "Order found");
    }
    catch (error) {
        next(error);
    }
});
exports.getOneOrder = getOneOrder;
//# sourceMappingURL=order.controller.js.map