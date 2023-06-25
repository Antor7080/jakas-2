import config from "config";
import mongoose, { HydratedDocument, QueryWithHelpers } from "mongoose";

import { connection } from "../../db/connection";

import {
  BatchModelType,
  IBatchInfoDoc,
  IBatchInfoQueryHelpers,
} from "./batch.interfaces";

const batchInfoCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.batch"
);

const BatchInfoSchema = new mongoose.Schema<
  IBatchInfoDoc,
  BatchModelType,
  {},
  IBatchInfoQueryHelpers
>(
  {
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
    hensPrice: {
      type: Number,
    },
    batchStartDate: {
      type: String,
    },
    sprayed_disinfectants: {
      type: Boolean,
    },
    bleaching_cleaned: {
      type: Boolean,
    },
    isFumigation: {
      type: Boolean,
    },
    isBufferZone: {
      type: Boolean,
    },
    isFootBaths: {
      type: Boolean,
    },
    entrySpary: {
      type: Boolean,
    },
    isDeadAnimal: {
      type: Boolean,
    },
    //src
    company_name: {
      type: String,
    },
    isGovt: {
      type: Boolean,
    },
    other: {
      type: String,
    },

    //food
    safeWater: {
      type: Boolean,
    },
    isWaterTest: {
      type: Boolean,
    },
    food_company_name: {
      type: String,
    },
    other_food_company: {
      type: String,
    },
    water_test_method: {
      type: String,
    },
    other_water_test: {
      type: String,
    },

    isPreBiotic: {
      type: Boolean,
    },
    Probiotics_days: {
      type: Number,
    },
    isWithdrwalFollow: {
      type: Boolean,
    },

    antibiotics_days: {
      type: Number,
    },
    doctorAdvice: {
      type: Boolean,
    },
    advicer_type: {
      type: String,
    },
    prescription: [
      {
        type: String,
      },
    ],

    dlsRegistered: {
      type: Boolean,
    },
    DLS_regi_no: {
      type: String,
    },
    isCertified: {
      type: Boolean,
    },
    vaccine: [
      {
        name: {
          type: String,
        },
        age: {
          type: Number,
        },
        otherVaccineName: {
          type: String,
        },
      },
    ],
    is40_42_days: {
      type: Boolean,
    },
    selling_age: {
      type: Number,
    },
    isGrowth_chart_used: {
      type: Boolean,
    },
    growthWeek1: {
      type: Number,
    },
    growthWeek2: {
      type: Number,
    },
    growthWeek3: {
      type: Number,
    },
    growthWeek4: {
      type: Number,
    },
    growthWeek5: {
      type: Number,
    },
    growthWeek6: {
      type: Number,
    },
    growthWeek7: {
      type: Number,
    },
    growthWeek8: {
      type: Number,
    },
    growthWeek9: {
      type: Number,
    },
    wasteRemoval: {
      type: String,
    },
    average_weight: {
      type: Number,
    },
    weight_count_age: {
      type: Number,
    },
    qr_code: {
      type: String,
    },
    status: {
      type: String,
      default: "চলমান",
      enum: [
        "চলমান",
        "সম্পূর্ণ বিক্রি হয়েছে",
        "বিক্রি হয়নি",
        "অর্ডারকৃত",
        "বিক্রয়যোগ্য",
        "অপেক্ষমান",
      ],
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
    farmer: {
      phone: {
        type: String,
      },
      name: {
        type: String,
      },
      zilla: {
        type: String,
      },
      upazilla: {
        type: String,
      },
      union: {
        type: String,
      },
      village: {
        type: String,
      },
      Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    mortality: [
      {
        date: String,
        count: Number,
        age: Number,
      },
    ],

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
    is_deleted: {
      type: Boolean,
      default: false,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalSale: Number,
    expectedPrice: Number,
    pricePerKg: Number,
    available_for_sale_count: Number,
    id: {
      type: Number,
      auto: true,
      // required: true,
    },
  },

  {
    timestamps: true,
  }
);

BatchInfoSchema.query.notDeleted = function notDeleted(
  this: QueryWithHelpers<
    any,
    HydratedDocument<IBatchInfoDoc>,
    IBatchInfoQueryHelpers
  >
) {
  return this.where({ is_deleted: false });
};

BatchInfoSchema.index(
  { shed_no: 1, batch_no: 1, "farmer.phone": 1 },
  { unique: true }
);

BatchInfoSchema.pre<IBatchInfoDoc>("save", async function (next) {
  if (this.isNew) {
    try {
      const lastOrder = await BatchInfo.findOne({}, {}, { sort: { id: -1 } });
      if (lastOrder) {
        this.id = lastOrder.id + 1;
      } else {
        this.id = 1;
      }
    } catch (error) {
      return next(error);
    }
  }
  return next();
});
const BatchInfo = connection.jakas_poultryConnection.model<
  IBatchInfoDoc,
  BatchModelType
>("Batch", BatchInfoSchema, batchInfoCollectionName);

export { BatchInfo };
