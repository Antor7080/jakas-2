"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const accountCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.accounts");
const accountSchema = new mongoose_1.default.Schema({
    hensInfo: {
        batch_no: Number,
        shed_no: Number,
        hensTypes: String,
        hensCount: Number,
        averageWeight: Number,
        age: Number,
        Id: mongoose_1.default.Types.ObjectId,
    },
    farmerInfo: {
        name: String,
        phone: String,
        zilla: String,
        upazilla: String,
        union: String,
        village: String,
        Id: mongoose_1.default.Types.ObjectId,
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
    expenses: [
        {
            amount: Number,
            description: String,
            expenseDate: String,
            source: String,
            entryDate: Date,
        },
    ],
    incomes: [
        {
            amount: Number,
            source: String,
            description: String,
            incomeDate: String,
            entryDate: Date,
        },
    ],
    totalExpense: Number,
    totalIncome: Number,
    netBalance: Number,
    is_deleted: {
        type: Boolean,
        default: false,
    },
});
accountSchema.query.notDeleted = function () {
    return this.where({ is_deleted: false });
};
const Account = connection_1.connection.jakas_poultryConnection.model("Account", accountSchema, accountCollectionName);
exports.Account = Account;
//# sourceMappingURL=accounts.model.js.map