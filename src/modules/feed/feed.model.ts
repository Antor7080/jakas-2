import config from "config";
import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";
import { connection } from "../../db/connection";
import { IFeedDoc, IFeedModel, IFeedQueryHelpers } from "./feed.interfaces";
const feedCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.feed"
);

const FeedSchema = new mongoose.Schema<
  IFeedDoc,
  IFeedModel,
  {},
  IFeedQueryHelpers
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

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
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
      Id: { type: mongoose.Schema.Types.ObjectId },
    },
    status: {
      type: String,
      enum: ["অপেক্ষারত", "অনুমোদিত", "বাতিল", "সম্পন্ন"],
    },
  },
  {
    timestamps: true,
  }
);

FeedSchema.query.notDeleted = function (
  this: QueryWithHelpers<
    //   any,
    HydratedDocument<IFeedDoc>,
    IFeedQueryHelpers
  >
) {
  return this.where({ is_deleted: false });
};
const Feed = connection.jakas_poultryConnection.model<IFeedDoc, IFeedModel>(
  "Feed",
  FeedSchema,
  feedCollectionName
);

export { Feed };
