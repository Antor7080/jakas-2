import config from "config";
import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";

import { connection } from "../../db/connection";
import {
  IPrescriptionDoc,
  IPrescriptionModel,
  IPrescriptionQueryHelpers,
} from "./prescription.interfaces";
const prescriptionCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.prescription"
);
console.log({ prescriptionCollectionName });
const PrescriptionSchema = new mongoose.Schema<
  IPrescriptionDoc,
  IPrescriptionModel,
  {},
  IPrescriptionQueryHelpers
>(
  {
    hensInfo: {
      batch_no: Number,
      shed_no: Number,
      hensTypes: String,
      hensCount: Number,
      averageWeight: Number,
      age: Number,
      Id: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    farmerInfo: {
      name: { type: String },
      phone: { type: String },
      zilla: { type: String },
      upazilla: { type: String },
      union: { type: String },
      village: { type: String },
      Id: { type: mongoose.Schema.Types.ObjectId },
    },
    doctorInfo: {
      name: { type: String },
      phone: { type: String },
      zilla: { type: String },
      upazilla: { type: String },
      union: { type: String },
      village: { type: String },
      Id: { type: mongoose.Schema.Types.ObjectId },
    },
    agent: {
      phone: {
        type: String,
      },
      name: {
        type: String,
      },
      Id: {
        type: mongoose.Schema.Types.ObjectId,
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
    }, // fever, cold, cough, headache

    audit_trails: {
      created_at: Date,
      updated_at: Date,
      deleted_at: Date,
      created_by: String,
      updated_by: String,
      deleted_by: String,
      created_detail: String, // Created by customer with _id .....
      updated_detail: String, // Updated by staff with _id .....
      deleted_detail: String, // Deleted by admin with _id .....
      admin_note: String, // Admin note
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    medicines: [
      {
        medicineName: String, // paracetamol, amoxicillin, ciprofloxacin
        medicineQuantity: Number, // 1 piece, 1 bottle, 1 box
        medicineUnitPrice: Number, // 1 piece price
        medicinePrice: Number, // medicineQuantity * medicineUnitPrice
        medicineType: String, // tablet, capsule, syrup, powder, injection
        medicineDose: String, // 1+1+1, 1+0+1, 0+0+1
        medicineDuration: String, // 5 days, 10 days
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
  },
  { timestamps: true }
);

PrescriptionSchema.query.notDeleted = function (
  this: QueryWithHelpers<
    HydratedDocument<IPrescriptionDoc>,
    IPrescriptionQueryHelpers
  >
) {
  return this.where({ is_deleted: false });
};

const PrescriptionModel = connection.jakas_poultryConnection.model<
  IPrescriptionDoc,
  IPrescriptionModel
>("Prescription", PrescriptionSchema, prescriptionCollectionName);

export { PrescriptionModel };
