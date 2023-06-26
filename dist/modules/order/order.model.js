"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const orderCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.order");
const OrderSchema = new mongoose_1.default.Schema({
    hensInfo: {
        batch_no: {
            type: Number,
        },
        shed_no: {
            type: Number,
        },
        hensTypes: {
            type: String,
        },
        hensCount: {
            type: Number,
        },
        averageWeight: Number,
        age: Number,
        Id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
        },
    },
    farmerInfo: {
        name: String,
        phone: String,
        zilla: String,
        upazilla: String,
        union: String,
        village: String,
        Id: mongoose_1.default.Schema.Types.ObjectId,
    },
    agent: {
        phone: String,
        name: String,
        Id: mongoose_1.default.Schema.Types.ObjectId,
    },
    audit_trails: {
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
        created_by: String,
        updated_by: String,
        deleted_by: String,
        created_detail: String,
        updated_detail: String,
        deleted_detail: String,
        admin_note: String, // Customer was deleted on request through phone
    },
    buyer: {
        phone: String,
        name: String,
        Id: mongoose_1.default.Schema.Types.ObjectId,
        zilla: String,
        upazilla: String,
        union: String,
        village: String,
    },
    status: {
        type: String,
        //bangla
        enum: ["অপেক্ষমান", "সম্পন্ন", "বাতিল"],
        default: "অপেক্ষমান"
    },
    price: Number,
    hensCount: Number,
    weight: Number,
    pricePerKg: Number,
    totalPrice: Number,
}, {
    timestamps: true,
});
OrderSchema.query.notDeleted = function () {
    return this.where({ is_deleted: false });
};
const OrderModel = connection_1.connection.jakas_poultryConnection.model("Order", OrderSchema, orderCollectionName);
exports.OrderModel = OrderModel;
//# sourceMappingURL=order.model.js.map