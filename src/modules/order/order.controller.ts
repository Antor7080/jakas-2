import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../../errors";
import { filterOption } from "../../helpers/filterOption";
import { IAdder, IHensInfo } from "../../shared";
import {
  getById as getBatchInfoById,
  updateById as updateBatchById,
} from "../batch/batch.service";

import { resTransformer as batchTransformer } from "../batch/batch.transformer";

import {
  createOrder,
  getAllOrder,
  getByOrderId,
  updateOrderById,
} from "./order.services";

import { resTransformer } from "./res.transformer";

/**
 * 
 * @objective create new order
 * @route POST /order/create
 * @access private
 * @description create new order
 *@body {
    "batchId": "647d7308b4be402d335a0467",
    "hensCount": 574
}

 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const { hensCount } = req.body;
    const batches = await getBatchInfoById(req.body.batchId);

    if (!batches) throw new ApiError(404, "Batch Info Not Found");

    // check if batch is ready for order
    if (batches.status !== "বিক্রয়যোগ্য")
      throw new ApiError(400, "unable to order");
    const batchInfo = batchTransformer(batches, user.role);

    // farmer info
    const farmerInfo: IAdder = batchInfo.farmer;

    // buyer info
    const buyer: IAdder = {
      name: user.name,
      phone: user.phone,
      Id: user._id,
      zilla: user.zilla,
      upazilla: user.upazilla,
      union: user.union,
      village: user.village,
    };

    // hens info
    const hensInfo: IHensInfo = {
      batch_no: batchInfo.batch_no,
      shed_no: batchInfo.shed_no,
      hensTypes: batchInfo.hensTypes,
      hensCount: hensCount ? hensCount : batchInfo.hensCount,
      averageWeight: batchInfo.average_weight,
      age: batchInfo.age, //current age
      Id: batchInfo._id,
    };

    const info = {
      ...req.body,
      hensInfo: hensInfo,
      farmerInfo,
      buyer: buyer,
      addedBy: user._id,
      agent: batchInfo.agent,
      audit_trails: {
        created_by: user._id,
        created_at: new Date(),
        created_detail: `Ordered By ${user.name} (${user.phone})`,
      },
    };

    const order = await createOrder(info);
    const transormedOrder = resTransformer(order);
    // update batch status
    await updateBatchById(req.body.batchId, { status: "অর্ডারকৃত" });
    return res.created(transormedOrder, "Ordered successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  //status update

  const user = res.locals.user;
  const orderId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
    req.params.id
  );
  if (!req.body.status) throw new ApiError(400, "Status is required");

  let batchStatus = "";
  if (req.body.status === "সম্পন্ন") {
    batchStatus = "সম্পূর্ণ বিক্রি হয়েছে";
  }
  if (req.body.status === "বাতিল") {
    batchStatus = "বিক্রয়যোগ্য";
  }
  try {
    const audit_trails = {
      updated_by: user._id,
      updated_detail: `Status change by ${user.name} (${user.phone})`,
    };

    const order = await updateOrderById(orderId, req.body, audit_trails);

    if (!order) throw new ApiError(404, "Order not found");

    // update batch status
    await updateBatchById(
      order.hensInfo.Id,
      { status: batchStatus },
      audit_trails
    );

    const transormedOrder = resTransformer(order);
    return res.ok(transormedOrder, "Updated successfully");
  } catch (error) {}
};

const getAllOrderForAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const { filters, queries } = filterOption(req);
    let filtersWithAuthUser = {
      ...filters, 
    };
    if (user.role === "buyer") {
      filtersWithAuthUser = { ...filters, "buyer.Id": user._id };
    }
    if (user.role === "farmer") {
      filtersWithAuthUser = { ...filters, "farmerInfo.Id": user._id };
    }
    if (user.role === "agent") {
      filtersWithAuthUser = { ...filters, "agent.Id": user._id };
    }
    const { total, page, order } = await getAllOrder(
      filtersWithAuthUser,
      queries
    );
    if (total < 1) {
      return res.ok({ total, page, order }, "No order found");
    }
    const orderTransformer = resTransformer(order);
    return res.ok({ total, page, order: orderTransformer }, "All order");
  } catch (error) {
    next(error);
  }
};

const getOneOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const order = await getByOrderId(orderId);
    if (!order) throw new ApiError(404, "Order not found");
    const orderTransformer = resTransformer(order);
    return res.ok(orderTransformer, "Order found");
  } catch (error) {
    next(error);
  }
};

export { create, getAllOrderForAuthUser, getOneOrder, updateOrder };
