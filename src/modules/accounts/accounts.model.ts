import config from "config";
import {
  IAccountDoc,
  IAccountModel,
  IAccountQueryHelpers,
} from "./accounts.interfaces";

import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";
import { connection } from "../../db/connection";

const accountCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.accounts"
);

const accountSchema = new mongoose.Schema<
  IAccountDoc,
  IAccountModel,
  {},
  IAccountQueryHelpers
>({
  hensInfo: {
    batch_no: Number,
    shed_no: Number,
    hensTypes: String,
    hensCount: Number,
    averageWeight: Number,
    age: Number,
    Id: mongoose.Types.ObjectId,
  },
  farmerInfo: {
    name: String,
    phone: String,
    zilla: String,
    upazilla: String,
    union: String,
    village: String,
    Id: mongoose.Types.ObjectId,
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

accountSchema.query.notDeleted = function (
  this: QueryWithHelpers<HydratedDocument<IAccountDoc>, IAccountQueryHelpers>
) {
  return this.where({ is_deleted: false });
};

const Account = connection.jakas_poultryConnection.model<
  IAccountDoc,
  IAccountModel
>("Account", accountSchema, accountCollectionName);

export { Account };
