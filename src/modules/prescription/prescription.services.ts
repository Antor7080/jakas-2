import { PrescriptionModel } from "./prescription.model";
//import interface
import mongoose from "mongoose";
import { IPrescription, IPrescriptionDoc } from "./prescription.interfaces";

const create = async (
  prescription: IPrescription
): Promise<IPrescriptionDoc> => {
  return await PrescriptionModel.create(prescription);
};

const getOneQuery = async (query: any): Promise<IPrescriptionDoc> => {
  return await PrescriptionModel.findOne(query).notDeleted();
};

const getById = async (
  id: mongoose.Types.ObjectId
): Promise<IPrescriptionDoc> => {
  return await PrescriptionModel.findById(id).notDeleted();
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
  const prescription = await PrescriptionModel.find(finalFilters)
    .notDeleted()
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await PrescriptionModel.find(finalFilters)
    .notDeleted()
    .countDocuments();
  const page = Math.ceil(total / queries.limit);
  return { total, page, prescription };
};

const givePrescription = async (
  id: mongoose.Types.ObjectId,
  updateBody: object,
  audit_trails: any
) => {
  const { updated_by, updated_detail } = audit_trails;
  const updatePrescription = PrescriptionModel.findByIdAndUpdate(
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
  return updatePrescription;
};

export { create, getOneQuery, getById, getAll, givePrescription };
