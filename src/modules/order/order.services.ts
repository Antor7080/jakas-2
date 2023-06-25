import mongoose from "mongoose";
import { IOrder } from "./order.interfaces";
import { OrderModel } from "./order.model";
import { IAuditTrail } from "../../shared";

const createOrder = async (order: IOrder) => {
  const newOrder = new OrderModel(order);
  return newOrder.save();
};

const getAllOrder = async (filters: object, queries: any) => {
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
    const order = await OrderModel.find(finalFilters)
        .notDeleted()
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);
    
    const total = await OrderModel.find(finalFilters).notDeleted().countDocuments();
    const page = Math.ceil(total / queries.limit);
    return { total, page, order };
};

const getByOrderId = async (id: mongoose.Types.ObjectId) => {
    return await OrderModel.findById(id).notDeleted();
}

const getOneByQuery = async (cxtObje: object) => {
    return OrderModel.findOne(cxtObje).notDeleted();
}
const updateOrderById = async (id: mongoose.Types.ObjectId, order: IOrder, audit_trails: IAuditTrail) => {
  console.log(order);
  const { updated_by, updated_detail } = audit_trails;
const updatedOrder = await OrderModel.findByIdAndUpdate(
  {
    _id: id,
  },
  {
    $set: {
      ...order,
      "audit_trails.updated_at": new Date(),
      "audit_trails.updated_by": updated_by,
      "audit_trails.updated_detail": updated_detail,
    }
  },
  {
    new: true,
  }
)
return updatedOrder

};
 export { createOrder, getAllOrder, getByOrderId, getOneByQuery , updateOrderById};
