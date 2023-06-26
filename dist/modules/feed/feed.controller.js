"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByFeedId = exports.getByByAuthUser = exports.getAllFeedOrder = exports.createFeed = exports.confirmFeedOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const filterOption_1 = require("../../helpers/filterOption");
const user_service_1 = require("../users/user.service");
const feed_service_1 = require("./feed.service");
const feed_transformer_1 = require("./feed.transformer");
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
const createFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const dealerInfo = yield (0, user_service_1.getById)(req.body.dealerId);
        if (!dealerInfo)
            throw new errors_1.ApiError(404, "Dealer Not Found");
        const dealer = {
            name: dealerInfo.name,
            phone: dealerInfo.phone,
            Id: dealerInfo._id,
            zilla: dealerInfo.zilla,
            upazilla: dealerInfo.upazilla,
            union: dealerInfo.union,
            village: dealerInfo.village,
        };
        const info = Object.assign(Object.assign({}, req.body), { hensInfo: req.body.hensInfo, farmerInfo: farmer, feedSaller: dealer, addedBy: user._id, agent: user.addedBy, audit_trails: {
                created_by: user._id,
                created_at: new Date(),
                created_detail: `Ordered By ${user.name} (${user.phone})`,
            } });
        const feed = yield (0, feed_service_1.create)(info);
        const transormedFeed = (0, feed_transformer_1.resTransformer)(feed);
        return res.created(transormedFeed, "Feed ordered successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.createFeed = createFeed;
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
const getAllFeedOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        const { total, page, feed } = yield (0, feed_service_1.getAll)(filters, queries);
        const transormedList = (0, feed_transformer_1.resTransformer)(feed);
        return res.ok({
            total,
            page,
            feed: transormedList,
        }, "Feed fetched successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getAllFeedOrder = getAllFeedOrder;
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
const getByFeedId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params.id);
        const feed = yield (0, feed_service_1.getById)(_id);
        if (!feed) {
            throw new errors_1.ApiError(404, "Feed Not Found");
        }
        const transormedFeed = (0, feed_transformer_1.resTransformer)(feed);
        return res.ok(transormedFeed, "Feed fetched successfully");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getByFeedId = getByFeedId;
const confirmFeedOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params.id);
        const feed = yield (0, feed_service_1.getById)(_id);
        if (!feed) {
            throw new errors_1.ApiError(404, "Feed Not Found");
        }
        const { status, feeds } = req.body;
        const feedTotalPrice = feeds.reduce((acc, curr) => {
            return acc + curr.feedPrice;
        }, 0);
        const updateBody = {
            status,
            feeds,
            feedTotalPrice,
        };
        const updateResult = yield (0, feed_service_1.updateById)(_id, updateBody, {
            updated_by: user._id.toString(),
            updated_detail: `Updated By ${user.name} (${user.phone})`,
        });
        const transormedFeed = (0, feed_transformer_1.resTransformer)(updateResult);
        res.ok(transormedFeed, "Feed order confirmed successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.confirmFeedOrder = confirmFeedOrder;
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
const getByByAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        let filtersWithAuthUser = {};
        if (user.role === "feedSeller") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "feedSaller.Id": user._id });
        }
        if (user.role === "farmer") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "farmerInfo.Id": user._id });
        }
        if (user.role === "agent") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "agent.Id": user._id });
        }
        const { total, page, feed } = yield (0, feed_service_1.getAll)(filtersWithAuthUser, queries);
        const transormedList = (0, feed_transformer_1.resTransformer)(feed);
        return res.ok({
            total,
            page,
            feed: transormedList,
        }, "Feed fetched successfully");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getByByAuthUser = getByByAuthUser;
//# sourceMappingURL=feed.controller.js.map