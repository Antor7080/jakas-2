import mongoose from "mongoose";
import { ApiError } from "../../errors";
import { loger } from "../../logger";
import { IUser } from "./user.interfaces";
import { User } from "./user.model";

const create = async (info: IUser) => {
  const userByPhone = await getOne({ phone: info.phone });
  if (userByPhone) {
    throw new ApiError(400, "phone already taken");
  }
  const user = User.build(info);

  return user.save();
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
  const users = await User.find(finalFilters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await User.countDocuments(finalFilters);
  const page = Math.ceil(total / queries.limit);
  return { users, total, page };
};

const getOne = async (info: object) => {
  return User.findOne(info);
};

const getById = async (_id: mongoose.Types.ObjectId) => {
  return User.findById(_id);
};

const updateById = async (_id: mongoose.Types.ObjectId, updateBody: object) => {
  const user = await getById(_id);
  loger.debug(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, updateBody);

  return user.save();
};

export { create, getAll, getById, getOne, updateById };
