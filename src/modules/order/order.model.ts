import config from "config";
import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";
import { connection } from "../../db/connection";
import { IOrderDoc, IOrderModel, IOrderQueryHelpers } from "./order.interfaces";

const orderCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.order"
);

const OrderSchema = new mongoose.Schema<
  IOrderDoc,
  IOrderModel,
  {},
  IOrderQueryHelpers
>(
  {
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
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    farmerInfo: {
      name: String,
      phone: String,
      zilla: String,
      upazilla: String,
      union: String,
      village: String,
      Id: mongoose.Schema.Types.ObjectId,
    },
    agent: {
      phone: String,
      name: String,
      Id: mongoose.Schema.Types.ObjectId,
    },
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
      admin_note: String, // Customer was deleted on request through phone
    },
    buyer: {
      phone: String,
      name: String,
      Id: mongoose.Schema.Types.ObjectId,
      zilla: String,
      upazilla: String,
      union: String,
      village: String,
    },
    status:{
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
  },
  {
    timestamps: true,
  }
);

OrderSchema.query.notDeleted = function (
  this: QueryWithHelpers<HydratedDocument<IOrderDoc>, IOrderQueryHelpers>
) {
  return this.where({ is_deleted: false });
};

const OrderModel = connection.jakas_poultryConnection.model<
  IOrderDoc,
  IOrderModel
>("Order", OrderSchema, orderCollectionName);

export { OrderModel };
