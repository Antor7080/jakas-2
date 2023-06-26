"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionModel = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const prescriptionCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.prescription");
console.log({ prescriptionCollectionName });
const PrescriptionSchema = new mongoose_1.default.Schema({
    hensInfo: {
        batch_no: Number,
        shed_no: Number,
        hensTypes: String,
        hensCount: Number,
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
    doctorInfo: {
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
    symptoms: {
        beakArr: [
            {
                type: String,
            },
        ],
        wattleArr: [
            {
                type: String,
            },
        ],
        combArr: [
            {
                type: String,
            },
        ],
        eyeArr: [
            {
                type: String,
            },
        ],
        earArr: [
            {
                type: String,
            },
        ],
        headArr: [
            {
                type: String,
            },
        ],
        featherArr: [
            {
                type: String,
            },
        ],
        droppingArr: [
            {
                type: String,
            },
        ],
        respiratoryArr: [
            {
                type: String,
            },
        ],
        nervousArr: [
            {
                type: String,
            },
        ],
        locomotoryArr: [
            {
                type: String,
            },
        ],
        alimentaryArr: [
            {
                type: String,
            },
        ],
        skinArr: [
            {
                type: String,
            },
        ],
        medicalComplaints: String,
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
        admin_note: String, // Admin note
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    medicines: [
        {
            medicineName: String,
            medicineQuantity: Number,
            medicineUnitPrice: Number,
            medicinePrice: Number,
            medicineType: String,
            medicineDose: String,
            medicineDuration: String,
            medicineNote: String, // খাওয়ার পর খাবার দেয়া যাবে না
        },
    ],
    medicineTotalPrice: Number,
    diseaseName: String,
    adviceNote: String,
    followupDate: Date,
    prescriptionNote: String,
    treatmentDate: Date,
    is_deleted: {
        type: Boolean,
        default: false, // soft delete
    },
    status: {
        type: String,
        default: "অপেক্ষারত",
        enum: ["অপেক্ষারত", "সম্পন্ন", "বাতিল"],
    },
}, { timestamps: true });
PrescriptionSchema.query.notDeleted = function () {
    return this.where({ is_deleted: false });
};
const PrescriptionModel = connection_1.connection.jakas_poultryConnection.model("Prescription", PrescriptionSchema, prescriptionCollectionName);
exports.PrescriptionModel = PrescriptionModel;
//# sourceMappingURL=prescription.model.js.map