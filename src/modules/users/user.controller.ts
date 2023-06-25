import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../../errors";
import { AddedBy, IUser } from "./user.interfaces";

import * as userService from "./user.service";
import { resTransformer } from "./user.transformer";
import { filterOption } from "../../helpers/filterOption";
import { batchCount } from "../batch/batch.service";

/**
 *
 * @objective Get all users
 * @endpoint v1/api/user/
 * @mehtod GET
 * @res [{"_id": "63bfc318e073e59d901bfdb3", "phone": "+470186795496323", "user_name": "Jhon" },
 * {"_id": "63bfc32fe073e59d901bfdb7", "phone": "+470146795496344", "user_name": "David" }]
 */
const getAllforAuthUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    
    const { filters, queries } = filterOption(req);
    // filter with auth user
    let filtersWithAuthUser={...filters}
    if(user.role === "agent"){
      filtersWithAuthUser = {...filters, "addedBy.Id": user._id}
    } 
    const {users, total, page=1} = await userService.getAll(filtersWithAuthUser, queries);
    const transormedList = resTransformer(users);

    //batch count for agent
    const userWithBatchCount = [];
    for (const user of transormedList ) {
     if(user.role === "agent"){
      const total = await batchCount(user._id);
      userWithBatchCount.push({...user, batchCount: total})
     } else {
      userWithBatchCount.push(user)
     }

    }
    const data = {
      total,
      page: page? page: 1,
      users: userWithBatchCount,
    }
    return res.ok(data, "Users fetched successfully")
  } catch (error) {
    next(error);
  }
};


const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filters, queries } = filterOption(req);
  
    const {users, total, page=1} = await userService.getAll(filters, queries);
    const transormedList = resTransformer(users);
    const data = {
      total,
      page: page? page: 1,
      users: transormedList,
    }
    return res.ok(data, "Users fetched successfully")
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @objective Get user by id
 * @endpoint v1/api/user/object_id
 * @mehtod GET
 * @res { "_id": "63bfcab7050004c0d5aabf1b", "phone": "+470186795496323", "user_name": "Jhon"}
 */
const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params._id
    );
    const user = await userService.getById(_id);

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }
    const transormedUser = resTransformer(user);
    return res.status(200).send(transormedUser);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @objective Create an user
 * @endpoint v1/api/user/add
 * @mehtod POST
 * @reqbody = {"phone":"+470186795496323","name":"David","password":"david@4326"}
 * @res {"_id":"63c2863136a43d4587ab9023","phone":"+470186795496323","name":"David"}
 */
const create = async (req: Request, res: Response, next: NextFunction) => {
  const reqUser = res.locals.user;
  try {
    const addedBy: AddedBy = {
      name: reqUser.name,
      phone: reqUser.phone,
      role: reqUser.role,
      Id: reqUser._id,
    };
    const info: IUser = {
      ...req.body,
      role: req.body?.role || "farmer",
      addedBy,
    };
    const user = await userService.create(info);
    const transormedUser = resTransformer(user);
    return res.created(transormedUser);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @objective Update an user
 * @endpoint v1/api/user/:_id
 * @mehtod PUT
 * @reqbody = {"phone":"+470186795496323","user_name":"David","password":"david@4326"}
 * @res {"_id":"63c2863136a43d4587ab9023","phone":"+470186795496323","user_name":"David"}
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params._id
    );
    // const { user_name, phone } = ;
    const user = await userService.updateById(_id, { ...req.body });
    const transormedUser = resTransformer(user);

    return res.status(201).send(transormedUser);
  } catch (error) {
    next(error);
  }
};

export {
  create as createUser,
  getOne as getUser,
  getAllforAuthUser as getAllByAuthUser,
  update as updateUser,
  getAll as getAllUsers
};
