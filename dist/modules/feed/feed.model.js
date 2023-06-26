"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const feedCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.feed");
const FeedSchema = new mongoose_1.default.Schema({
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
        name: { type: String },
        phone: { type: String },
        zilla: { type: String },
        upazilla: { type: String },
        union: { type: String },
        village: { type: String },
        Id: { type: mongoose_1.default.Schema.Types.ObjectId },
    },
    agent: {
        phone: {
            type: String,
        },
        name: {
            type: String,
        },
        Id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
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
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    feeds: [
        {
            feedType: { type: String },
            feedName: { type: String },
            feedQuantity: { type: Number },
            feedUnit: { type: String },
            feedUnitPrice: { type: Number },
            feedPrice: { type: Number },
        },
    ],
    feedTotalPrice: { type: Number },
    feedDate: { type: String },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    feedSaller: {
        name: { type: String },
        phone: { type: String },
        zilla: { type: String },
        upazilla: { type: String },
        union: { type: String },
        village: { type: String },
        Id: { type: mongoose_1.default.Schema.Types.ObjectId },
    },
    status: {
        type: String,
        enum: ["অপেক্ষারত", "অনুমোদিত", "বাতিল", "সম্পন্ন"],
    },
}, {
    timestamps: true,
});
FeedSchema.query.notDeleted = function () {
    return this.where({ is_deleted: false });
};
const Feed = connection_1.connection.jakas_poultryConnection.model("Feed", FeedSchema, feedCollectionName);
exports.Feed = Feed;
//# sourceMappingURL=feed.model.js.map