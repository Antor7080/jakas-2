"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllUsers = exports.updateUser = exports.getAllByAuthUser = exports.getUser = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const userService = __importStar(require("./user.service"));
const user_transformer_1 = require("./user.transformer");
const filterOption_1 = require("../../helpers/filterOption");
const batch_service_1 = require("../batch/batch.service");
/**
 *
 * @objective Get all users
 * @endpoint v1/api/user/
 * @mehtod GET
 * @res [{"_id": "63bfc318e073e59d901bfdb3", "phone": "+470186795496323", "user_name": "Jhon" },
 * {"_id": "63bfc32fe073e59d901bfdb7", "phone": "+470146795496344", "user_name": "David" }]
 */
const getAllforAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        // filter with auth user
        let filtersWithAuthUser = Object.assign({}, filters);
        if (user.role === "agent") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filters), { "addedBy.Id": user._id });
        }
        const { users, total, page = 1 } = yield userService.getAll(filtersWithAuthUser, queries);
        const transormedList = (0, user_transformer_1.resTransformer)(users);
        //batch count for agent
        const userWithBatchCount = [];
        for (const user of transormedList) {
            if (user.role === "agent") {
                const total = yield (0, batch_service_1.batchCount)(user._id);
                userWithBatchCount.push(Object.assign(Object.assign({}, user), { batchCount: total }));
            }
            else {
                userWithBatchCount.push(user);
            }
        }
        const data = {
            total,
            page: page ? page : 1,
            users: userWithBatchCount,
        };
        return res.ok(data, "Users fetched successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getAllByAuthUser = getAllforAuthUser;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        const { users, total, page = 1 } = yield userService.getAll(filters, queries);
        const transormedList = (0, user_transformer_1.resTransformer)(users);
        const data = {
            total,
            page: page ? page : 1,
            users: transormedList,
        };
        return res.ok(data, "Users fetched successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAll;
/**
 *
 * @objective Get user by id
 * @endpoint v1/api/user/object_id
 * @mehtod GET
 * @res { "_id": "63bfcab7050004c0d5aabf1b", "phone": "+470186795496323", "user_name": "Jhon"}
 */
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        const user = yield userService.getById(_id);
        if (!user) {
            throw new errors_1.ApiError(404, "User Not Found");
        }
        const transormedUser = (0, user_transformer_1.resTransformer)(user);
        return res.status(200).send(transormedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getOne;
/**
 *
 * @objective Create an user
 * @endpoint v1/api/user/add
 * @mehtod POST
 * @reqbody = {"phone":"+470186795496323","name":"David","password":"david@4326"}
 * @res {"_id":"63c2863136a43d4587ab9023","phone":"+470186795496323","name":"David"}
 */
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reqUser = res.locals.user;
    try {
        const addedBy = {
            name: reqUser.name,
            phone: reqUser.phone,
            role: reqUser.role,
            Id: reqUser._id,
        };
        const info = Object.assign(Object.assign({}, req.body), { role: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.role) || "farmer", addedBy });
        const user = yield userService.create(info);
        const transormedUser = (0, user_transformer_1.resTransformer)(user);
        return res.created(transormedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = create;
/**
 *
 * @objective Update an user
 * @endpoint v1/api/user/:_id
 * @mehtod PUT
 * @reqbody = {"phone":"+470186795496323","user_name":"David","password":"david@4326"}
 * @res {"_id":"63c2863136a43d4587ab9023","phone":"+470186795496323","user_name":"David"}
 */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        // const { user_name, phone } = ;
        const user = yield userService.updateById(_id, Object.assign({}, req.body));
        const transormedUser = (0, user_transformer_1.resTransformer)(user);
        return res.status(201).send(transormedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = update;
//# sourceMappingURL=user.controller.js.map