import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../../errors";
import { filterOption } from "../../helpers/filterOption";
import { IAdder } from "../../shared";
import { getById as getUserById } from "../users/user.service";
import { IFeedDoc, ISingleFeed } from "./feed.interfaces";
import { create, getAll, getById, updateById } from "./feed.service";
import { resTransformer } from "./feed.transformer";

/**
 * @objective Create feed order
 * @route POST /feed/create
 * @access private
 * @description Create feed order
 * @method POST
 * @body = {
    "hensInfo": {
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 575,
        "averageWeight": 2,
        "age": 30,
        "Id": "647d7308b4be402d335a0467"
    },
    "feeds": [
        {
            "feedName": "test food name",
            "feedType": "test",
            "feedQuantity": 10000,
            "feedUnit": "KG"
        },
        {
             "feedName": "test food name",
            "feedType": "test",
            "feedQuantity": 56550000,
             "feedUnit": "KG"
        }
    ],
    "dealerId": "6476e6eb4ce11836cbe1d3e0"
}
@res= {
    "success": true,
    "code": 201,
    "data": {
        "_id": "648efc83885d2f235bdc9cd5",
        "hensInfo": {
            "batch_no": 50,
            "shed_no": 3,
            "hensTypes": "সোনালী",
            "hensCount": 575,
            "averageWeight": 2,
            "age": 30,
            "Id": "647d7308b4be402d335a0467"
        },
        "farmerInfo": {
            "name": "user1",
            "phone": "01900000000",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c66194ae2a98c557ed1c"
        },
        "feedSaller": {
            "name": "Feed Seller Test",
            "phone": "01900000030",
            "zilla": "জয়পুরহাট",
            "upazilla": "সদর",
            "union": "জয়পুরহাট পৌরসভা",
            "village": "abc",
            "Id": "6476e6eb4ce11836cbe1d3e0"
        },
        "feeds": [
            {
                "feedType": "test",
                "feedName": "test food name",
                "feedQuantity": 10000,
                "feedUnit": "KG",
                "_id": "648efc83885d2f235bdc9cd6"
            },
            {
                "feedType": "test",
                "feedName": "test food name",
                "feedQuantity": 56550000,
                "feedUnit": "KG",
                "_id": "648efc83885d2f235bdc9cd7"
            }
        ],
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "audit_trails": {
            "created_at": "2023-06-18T12:45:55.566Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Ordered By user1 (01900000000)"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "createdAt": "2023-06-18T12:45:55.583Z",
        "updatedAt": "2023-06-18T12:45:55.583Z"
    },
    "message": "Feed ordered successfully"
}

*/
const createFeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    const farmer = {
      name: user.name,
      phone: user.phone,
      zilla: user.zilla,
      upazilla: user.upazilla,
      union: user.union,
      village: user.village,
      Id: user._id,
    };
    const dealerInfo = await getUserById(req.body.dealerId);
    if (!dealerInfo) throw new ApiError(404, "Dealer Not Found");
    const dealer: IAdder = {
      name: dealerInfo.name,
      phone: dealerInfo.phone,
      Id: dealerInfo._id,
      zilla: dealerInfo.zilla,
      upazilla: dealerInfo.upazilla,
      union: dealerInfo.union,
      village: dealerInfo.village,
    };

    const info = {
      ...req.body,
      hensInfo: req.body.hensInfo,
      farmerInfo: farmer,
      feedSaller: dealer,
      addedBy: user._id,
      agent: user.addedBy,
      audit_trails: {
        created_by: user._id,
        created_at: new Date(),
        created_detail: `Ordered By ${user.name} (${user.phone})`,
      },
    };
    const feed = await create(info);
    const transormedFeed = resTransformer(feed);
    return res.created(transormedFeed, "Feed ordered successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @objective Get all feed order
 * @route GET /feed/getAll
 * @access private
 * @description Get all feed order
 * @method GET
 * @res ={
    "success": true,
    "code": 200,
    "data": {
        "total": 5,
        "page": null,
        "feed": [
           
            {
                "_id": "648ea97fbeae7043ecad6464",
                "hensInfo": {
                    "batch_no": 50,
                    "shed_no": 3,
                    "hensTypes": "সোনালী",
                    "hensCount": 575,
                    "averageWeight": 2,
                    "age": 30,
                    "Id": "647d7308b4be402d335a0467"
                },
                "farmerInfo": {
                    "name": "user1",
                    "phone": "01900000000",
                    "zilla": "Dhaka",
                    "upazilla": "Mirpur",
                    "union": "Shewrapara",
                    "village": "N/A",
                    "Id": "6475c66194ae2a98c557ed1c"
                },
                "feedSaller": {
                    "name": "Feed Seller Test",
                    "phone": "01900000030",
                    "zilla": "জয়পুরহাট",
                    "upazilla": "সদর",
                    "union": "জয়পুরহাট পৌরসভা",
                    "village": "abc",
                    "Id": "6476e6eb4ce11836cbe1d3e0"
                },
                "feeds": [
                    {
                        "feedType": "test",
                        "feedQuantity": 10000,
                        "feedUnit": "KG",
                        "_id": "648ea97fbeae7043ecad6465"
                    },
                    {
                        "feedType": "test",
                        "feedQuantity": 56550000,
                        "feedUnit": "KG",
                        "_id": "648ea97fbeae7043ecad6466"
                    }
                ],
                "agent": {
                    "phone": "01986297080",
                    "name": "Antor",
                    "Id": "6475bef77b9d56801cfb7d98"
                },
                "audit_trails": {
                    "created_at": "2023-06-18T06:51:43.624Z",
                    "created_by": "6475c66194ae2a98c557ed1c",
                    "created_detail": "Ordered By user1 (01900000000)"
                },
                "addedBy": "6475c66194ae2a98c557ed1c",
                "createdAt": "2023-06-18T06:51:43.664Z",
                "updatedAt": "2023-06-18T06:51:43.664Z"
            }
        ]
    },
    "message": "Feed fetched successfully"
}
 */
const getAllFeedOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filters, queries } = filterOption(req);

    const { total, page, feed } = await getAll(filters, queries);
    const transormedList = resTransformer(feed);
    return res.ok(
      {
        total,
        page,
        feed: transormedList,
      },
      "Feed fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @objective Get feed by id
 * @endpoint v1/api/feed/:id
 * @method GET
 * @param id: mongoose.Types.ObjectId
 * res {
    "_id": "647dbc15444f06e6375b796d",
    "hensInfo": {
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 575,
        "Id": "647d7308b4be402d335a0467"
    },
    "farmerInfo": {
        "name": "user1",
        "phone": "01900000000",
        "zilla": "Dhaka",
        "upazilla": "Mirpur",
        "union": "Shewrapara",
        "village": "N/A",
        "Id": "6475c66194ae2a98c557ed1c"
    },
    "feedSaller": {
        "name": "Feed Seller Test",
        "phone": "01900000030",
        "zilla": "জয়পুরহাট",
        "upazilla": "সদর",
        "union": "জয়পুরহাট পৌরসভা",
        "village": "abc",
        "Id": "6476e6eb4ce11836cbe1d3e0"
    },
    "feedType": "test",
    "feedQuantity": 10000,
    "agent": {},
    "auditTrail": {
        "created_at": "2023-06-05T10:42:29.840Z",
        "created_by": "6475c66194ae2a98c557ed1c",
        "created_detail": "Ordered By user1 (01900000000)"
    },
    "addedBy": "6475c66194ae2a98c557ed1c"
}
 * @returns 
 */

const getByFeedId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const feed: IFeedDoc | null = await getById(_id);
    if (!feed) {
      throw new ApiError(404, "Feed Not Found");
    }
    const transormedFeed = resTransformer(feed);
    return res.ok(transormedFeed, "Feed fetched successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const confirmFeedOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  try {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const feed: IFeedDoc | null = await getById(_id);
    if (!feed) {
      throw new ApiError(404, "Feed Not Found");
    }
    const { status, feeds } = req.body;
    const feedTotalPrice: number = feeds.reduce(
      (acc: number, curr: ISingleFeed) => {
        return acc + curr.feedPrice;
      },
      0
    );
    const updateBody = {
      status,
      feeds,
      feedTotalPrice,
    };
    const updateResult = await updateById(_id, updateBody, {
      updated_by: user._id.toString(),
      updated_detail: `Updated By ${user.name} (${user.phone})`,
    });
    const transormedFeed = resTransformer(updateResult);
    res.ok(transormedFeed, "Feed order confirmed successfully");
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @objective Get all feed order by auth user
 * 
 * @route GET /feed/getByAuthUser
 * @access private
 * @description Get all feed order by auth user
 * @method GET
 * @res [{
    "_id": "647dbc15444f06e6375b796d",
    "hensInfo": {
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 575,
        "Id": "647d7308b4be402d335a0467"
    },
    "farmerInfo": {
        "name": "user1",
        "phone": "01900000000",
        "zilla": "Dhaka",
        "upazilla": "Mirpur",
        "union": "Shewrapara",
        "village": "N/A",
        "Id": "6475c66194ae2a98c557ed1c"
    },
    "feedSaller": {
        "name": "Feed Seller Test",
        "phone": "01900000030",
        "zilla": "জয়পুরহাট",
        "upazilla": "সদর",
        "union": "জয়পুরহাট পৌরসভা",
        "village": "abc",
        "Id": "6476e6eb4ce11836cbe1d3e0"
    },
    "feedType": "test",
    "feedQuantity": 10000,
    "agent": {},
    "auditTrail": {
        "created_at": "2023-06-05T10:42:29.840Z",
        "created_by": "6475c66194ae2a98c557ed1c",
        "created_detail": "Ordered By user1 (01900000000)"
    },
    "addedBy": "6475c66194ae2a98c557ed1c"
}]
 *
 */

const getByByAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const { filters, queries } = filterOption(req);
    let filtersWithAuthUser = {};
    if (user.role === "feedSeller") {
      filtersWithAuthUser = { ...filters, "feedSaller.Id": user._id };
    }
    if (user.role === "farmer") {
      filtersWithAuthUser = { ...filters, "farmerInfo.Id": user._id };
    }
    if (user.role === "agent") {
      filtersWithAuthUser = { ...filters, "agent.Id": user._id };
    }
    const { total, page, feed } = await getAll(filtersWithAuthUser, queries);
    const transormedList = resTransformer(feed);
    return res.ok(
      {
        total,
        page,
        feed: transormedList,
      },
      "Feed fetched successfully"
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  confirmFeedOrder,
  createFeed,
  getAllFeedOrder,
  getByByAuthUser,
  getByFeedId,
};
