import mongoose from "mongoose";
import { IAuditTrail } from "../../shared";
import { IFeed } from "./feed.interfaces";
import { Feed } from "./feed.model";

const create = async (cxtObje: IFeed) => {
  const feed = new Feed(cxtObje);
  //   return feed
  return feed.save();
};

const getOne = async (cxtObje: object) => {
  return Feed.findOne(cxtObje).notDeleted();
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
  console.log(dateRangeFilter.$gte);
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
  const feed = await Feed.find(finalFilters)
    .notDeleted()
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Feed.find(finalFilters).notDeleted().countDocuments();
  const page = Math.ceil(total / queries.limit);
  return { total, page, feed };
};
const getById = async (id: mongoose.Types.ObjectId) => {
  return await Feed.findById(id).notDeleted();
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  updateBody: object,
  audit_trails: IAuditTrail
) => {
  const { updated_by, updated_detail } = audit_trails;
  const updateFeed = Feed.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...updateBody,
        "audit_trails.updated_at": new Date(),
        "audit_trails.updated_by": updated_by,
        "audit_trails.updated_detail": updated_detail,
      },
    },
    {
      new: true,
    }
  ).notDeleted();
  return updateFeed;
};
export { create, getAll, getById, getOne, updateById };
