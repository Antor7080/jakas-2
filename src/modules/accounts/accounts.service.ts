
import mongoose from "mongoose";
import { Account } from "./accounts.model";

const addExpenseOrIncome = async (info: any) => {
    const account = await Account.create(info);
    return account;
};


const findById = async (id: mongoose.Types.ObjectId) => {
    const account = await Account.findById(id).notDeleted();
    return account;
};
const findOneByQuery = async (query: object) => {
    console.log(query);
    const account = await Account.findOne(query).notDeleted();
    return account;
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
    const accounts = await Account.find(finalFilters)
      .notDeleted()
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy);
  
    const total: number = await Account.find(finalFilters)
      .notDeleted()
      .countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, accounts };
  };;
export { addExpenseOrIncome, findById, findOneByQuery , getAll};