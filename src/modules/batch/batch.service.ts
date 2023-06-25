import mongoose from "mongoose";
import { loger } from "../../logger";
import { IAuditTrail } from "../../shared";
import { IBatchInfo } from "./batch.interfaces";
import { BatchInfo } from "./batch.model";

const create = async (cxtObje: IBatchInfo) => {
  const batch =  new  BatchInfo(cxtObje);
  return await batch.save();
};

const getOne = async (cxtObje: object) => {
  return BatchInfo.findOne(cxtObje);
};
const getAll = async (filters: object, queries: any) => {
  const { startDate, endDate } = queries;

  // Create a date range filter object
  const dateRangeFilter: any = {};
  if (startDate) {
    dateRangeFilter["$gte"] = new Date(startDate);
  }
  if (endDate) {
    dateRangeFilter["$lte"] = new Date(endDate);
  }
  // Add the date range filter to the other filters
  let finalFilters = {
    ...filters,
  };
  if (startDate || endDate) {
    finalFilters = {
      ...finalFilters,
      createdAt: dateRangeFilter, // Assuming `createdAt` field for the date range filter
    };
  }
  const batch = await BatchInfo.find(finalFilters)
    .notDeleted()
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total: number = await BatchInfo.find(finalFilters)
    .notDeleted()
    .countDocuments();
  const page = Math.ceil(total / queries.limit);
  return { total, page, batch };
};
const getById = async (_id: mongoose.Types.ObjectId) => {
  return BatchInfo.findById(_id);
};
const batchCount = async (userId: mongoose.Types.ObjectId) => {
  console.log({ userId });
  const total: number = await BatchInfo.find({
    "addedBy": userId,
  }).notDeleted().countDocuments();
  return total;
}

const findOneByQuery = (query: object) => {
  return BatchInfo.findOne(query).notDeleted();
};

/**
 *
 * @param _id
 * @param updateBody
 * @returns
 * `updateBody` is an object that contains the fields that you want to update
 *
 */

const updateById = async (
  _id: mongoose.Types.ObjectId,
  updateBody: object,
  audit_trail?: IAuditTrail
) => {
  loger.info("updateById");
  let info = {
    ...updateBody,
  };
  if (audit_trail) {
    info = {
      ...updateBody,
      "audit_trails.updated_at": new Date(),
      "audit_trails.updated_by": audit_trail.updated_by,
      "audit_trails.updated_detail": audit_trail.updated_detail,
    };
  }
  const updateBatch = BatchInfo.findByIdAndUpdate(
    {
      _id,
    },
    {
      $set: {
        ...info,
      },
    },
    {
      new: true,
    }
  ).notDeleted();
  return updateBatch;
};
const fineMany = async (query: object) => {
  return await BatchInfo.find(query).notDeleted();
};

export {
  create,
  findOneByQuery,
  fineMany,
  getAll,
  getById,
  getOne,
  batchCount,
  updateById,
};
