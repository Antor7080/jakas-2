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
exports.getOneById = exports.getOneByBatchId = exports.getAllAccountsBYAuthUser = exports.addOrUpdateAccounts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const filterOption_1 = require("../../helpers/filterOption");
const accounts_service_1 = require("./accounts.service");
const accounts_transformer_1 = require("./accounts.transformer");
// const addOrUpdateAccounts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { hensInfo } = req.body;
//     const user = res.locals.user;
//     const account = await findOneByQuery({ "hensInfo.Id": hensInfo.Id });
//     console.log(account);
//     const info = {
//       ...req.body,
//       hensInfo: req.body.hensInfo,
//       farmerInfo: {
//         name: user.name,
//         phone: user.phone,
//         zilla: user.zilla,
//         upazilla: user.upazilla,
//         union: user.union,
//         village: user.village,
//         Id: user._id,
//       },
//       expenses: req.body.expenses,
//       incomes: req.body.incomes,
//     };
//     if (account) {
//       account.hensInfo = info.hensInfo;
//       account.farmerInfo = info.farmerInfo;
//       account.expenses = info.expenses;
//       account.incomes = info.incomes;
//       account.audit_trails.updated_at = new Date();
//       account.audit_trails.updated_by = user._id;
//       account.audit_trails.updated_detail = `Updated by customer with _id ${user._id} (${user.phone})`;
//       const totalExpense = account.expenses.reduce(
//         (acc: number, expense: ISingleExpense) => acc + expense.amount,
//         0
//       );
//       const totalIncome = account.incomes.reduce(
//         (acc: number, income: ISingleIncome) => acc + income.amount,
//         0
//       );
//       (account.totalExpense = totalExpense),
//         (account.totalIncome = totalIncome),
//         (account.netBalance = totalExpense - totalIncome),
//         await account.save();
//       return res.ok({ data: account, message: "Account updated successfully" });
//     } else {
//       info.audit_trails = {
//         created_by: user._id,
//         created_at: new Date(),
//         created_detail: `Created By ${user.name} (${user.phone})`,
//       };
//     }
//     const newAccount = await addExpenseOrIncome(info);
//     res.ok({ data: newAccount, message: "Account added successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
/**
 *
 * @objectives Add or update accounts
 * @route POST /api/v1/accounts
 * @access Private
 * @description Add or update accounts
 * @body {
    
    "hensInfo": {
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 575,
        "averageWeight": 2,
        "age": 30,
        "Id": "647b2c8fa20b09a2dfa807cd"
    },
    "singleIncomeOrExpense": {
          "amount": 4110,
      "incomeDate": "2023-01-01",
      "description": "string",
      "type": "income"
    }
    
}
*@response {
    "success": true,
    "code": 201,
    "data": {
        "data": {
            "hensInfo": {
                "batch_no": 50,
                "shed_no": 3,
                "hensTypes": "সোনালী",
                "hensCount": 575,
                "averageWeight": 2,
                "age": 30,
                "Id": "647b2c8fa20b09a2dfa807cd"
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
            "audit_trails": {
                "created_at": "2023-06-15T06:36:57.148Z",
                "created_by": "Your created_by value",
                "created_detail": "Your created_detail value"
            },
            "expenses": [],
            "incomes": [
                {
                    "amount": 4110,
                    "description": "string",
                    "incomeDate": "2023-01-01",
                    "entryDate": "2023-06-15T06:36:57.148Z",
                    "_id": "648ab18958fda7950878fda5"
                }
            ],
            "totalExpense": 0,
            "totalIncome": 4110,
            "netBalance": 4110,
            "is_deleted": false,
            "_id": "648ab18958fda7950878fda4",
            "__v": 0
        },
        "message": "Account added successfully"
    },
    "message": "Successfully Created."
}
 */
const addOrUpdateAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hensInfo, singleIncomeOrExpense } = req.body;
        const user = res.locals.user;
        const account = yield (0, accounts_service_1.findOneByQuery)({ "hensInfo.Id": hensInfo.Id });
        //if account exist  for this batch then update or add new account
        if (account) {
            // if income then push to incomes array and update totalIncome and netBalance
            if (singleIncomeOrExpense.type === "income") {
                account.incomes.push({
                    amount: singleIncomeOrExpense.amount,
                    description: singleIncomeOrExpense.description,
                    incomeDate: singleIncomeOrExpense.incomeDate,
                    source: singleIncomeOrExpense.source,
                    entryDate: new Date(),
                });
                account.totalIncome += singleIncomeOrExpense.amount;
                account.netBalance += singleIncomeOrExpense.amount;
            }
            else if (singleIncomeOrExpense.type === "expense") {
                // if expense then push to expenses array and update totalExpense and netBalance
                account.expenses.push({
                    amount: singleIncomeOrExpense.amount,
                    source: singleIncomeOrExpense.source,
                    description: singleIncomeOrExpense.description,
                    expenseDate: singleIncomeOrExpense.expenseDate,
                    entryDate: new Date(),
                });
                account.totalExpense += singleIncomeOrExpense.amount;
                account.netBalance -= singleIncomeOrExpense.amount;
            }
            else {
                throw new errors_1.ApiError(400, 'Invalid data type. Expected "income" or "expense".');
            }
            account.audit_trails.updated_at = new Date();
            // Update other audit_trails fields as needed
            yield account.save();
            return res.ok({
                data: (0, accounts_transformer_1.resTransformer)(account),
                message: "Account updated successfully",
            });
        }
        else {
            const newAccountData = {
                hensInfo: req.body.hensInfo,
                farmerInfo: {
                    name: user.name,
                    phone: user.phone,
                    zilla: user.zilla,
                    upazilla: user.upazilla,
                    union: user.union,
                    village: user.village,
                    Id: user._id,
                },
                // store created_by, created_at, created_detail
                audit_trails: {
                    created_by: "Your created_by value",
                    created_at: new Date(),
                    created_detail: "Your created_detail value",
                },
                expenses: [],
                incomes: [],
                totalExpense: 0,
                totalIncome: 0,
                netBalance: 0,
            };
            if (singleIncomeOrExpense.type === "income") {
                // if income then push to incomes array and update totalIncome and netBalance
                newAccountData.incomes = [
                    {
                        amount: singleIncomeOrExpense.amount,
                        source: singleIncomeOrExpense.source,
                        description: singleIncomeOrExpense.description,
                        incomeDate: singleIncomeOrExpense.incomeDate,
                        entryDate: new Date(),
                    },
                ];
                newAccountData.totalIncome = singleIncomeOrExpense.amount;
                newAccountData.netBalance = singleIncomeOrExpense.amount;
            }
            else if (singleIncomeOrExpense.type === "expense") {
                // if expense then push to expenses array and update totalExpense and netBalance
                newAccountData.expenses.push({
                    amount: singleIncomeOrExpense.amount,
                    source: singleIncomeOrExpense.source,
                    description: singleIncomeOrExpense.description,
                    expenseDate: singleIncomeOrExpense.expenseDate,
                    entryDate: new Date(),
                });
                newAccountData.totalExpense = singleIncomeOrExpense.amount;
                newAccountData.netBalance = -singleIncomeOrExpense.amount;
            }
            else {
                throw new errors_1.ApiError(400, 'Invalid data type. Expected "income" or "expense".');
            }
            // create new account for this batch
            const newAccount = yield (0, accounts_service_1.addExpenseOrIncome)(newAccountData);
            res.created({
                data: (0, accounts_transformer_1.resTransformer)(newAccount),
                message: "Account added successfully",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addOrUpdateAccounts = addOrUpdateAccounts;
/**
 *
 * @objectives Get one account by id
 * @route GET /api/v1/accounts/:id
 * @access Private
 * @description Get one account by id
 * @params id
 * @response {
    "success": true,
    "code": 200,
    "data": {
        "data": {
            "hensInfo": {
                "batch_no": 50,
                "shed_no": 3,
                "hensTypes": "সোনালী",
                "hensCount": 575,
                "averageWeight": 2,
                "age": 30,
                "Id": "647b2c8fa20b09a2dfa807cd"
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
            "audit_trails": {
                "created_at": "2023-06-15T06:36:57.148Z",
                "created_by": "Your created_by value",
                "created_detail": "Your created_detail value"
            },
            "_id": "648ab18958fda7950878fda4",
            "expenses": [],
            "incomes": [
                {
                    "amount": 4110,
                    "description": "string",
                    "incomeDate": "2023-01-01",
                    "entryDate": "2023-06-15T06:36:57.148Z",
                    "_id": "648ab18958fda7950878fda5"
                }
            ],
            "totalExpense": 0,
            "totalIncome": 4110,
            "netBalance": 4110,
            "is_deleted": false,
            "__v": 0
        },
        "message": "Account fetched successfully"
    },
    "message": "OK"
}

 */
const getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongoose_1.default.Types.ObjectId(req.params.id);
        const account = yield (0, accounts_service_1.findById)(id);
        res.ok({
            data: (0, accounts_transformer_1.resTransformer)(account),
            message: "Account fetched successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getOneById = getOneById;
/**
 *
 * @objectives Get one account by batch id
 * @route GET /api/v1/accounts/batch/:id
 * @access Private
 * @description Get one account by batch id
 * @params id
 * @response {
    "success": true,
    "code": 200,
    "data": {
        "data": {
            "hensInfo": {
                "batch_no": 50,
                "shed_no": 3,
                "hensTypes": "সোনালী",
                "hensCount": 575,
                "averageWeight": 2,
                "age": 30,
                "Id": "647b2c8fa20b09a2dfa807cd"
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
            "audit_trails": {
                "created_at": "2023-06-15T06:36:57.148Z",
                "created_by": "Your created_by value",
                "created_detail": "Your created_detail value"
            },
            "_id": "648ab18958fda7950878fda4",
            "expenses": [],
            "incomes": [
                {
                    "amount": 4110,
                    "description": "string",
                    "incomeDate": "2023-01-01",
                    "entryDate": "2023-06-15T06:36:57.148Z",
                    "_id": "648ab18958fda7950878fda5"
                }
            ],
            "totalExpense": 0,
            "totalIncome": 4110,
            "netBalance": 4110,
            "is_deleted": false,
            "__v": 0
        },
        "message": "Account fetched successfully"
    },
    "message": "OK"
}
*/
const getOneByBatchId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const account = yield (0, accounts_service_1.findOneByQuery)({ "hensInfo.Id": batchId });
        if (!account)
            throw new errors_1.ApiError(404, "No account infomation found");
        res.ok({
            data: (0, accounts_transformer_1.resTransformer)(account),
            message: "Account fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getOneByBatchId = getOneByBatchId;
/**
 *
 * @objectives Get all accounts by auth user
 * @route GET /api/v1/accounts
 * @access Private
 * @description Get all accounts by auth user
 * @query startDate, endDate, page, limit, fields, sortBy
 * @response {
    "success": true,
    "code": 200,
    "data": {
        "data": {
            "accounts": [
                {
                    "_id": "648ab18958fda7950878fda4",
                    "hensInfo": {
                        "batch_no": 50,
                        "shed_no": 3,
                        "hensTypes": "সোনালী",
                        "hensCount": 575,
                        "averageWeight": 2,
                        "age": 30,
                        "Id": "647b2c8fa20b09a2dfa807cd"
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
                    "audit_trails": {
                        "created_at": "2023-06-15T06:36:57.148Z",
                        "created_by": "Your created_by value",
                        "created_detail": "Your created_detail value"
                    },
                    "expenses": [],
                    "incomes": [
                        {
                            "amount": 4110,
                            "description": "string",
                            "incomeDate": "2023-01-01",
                            "entryDate": "2023-06-15T06:36:57.148Z",
                            "_id": "648ab18958fda7950878fda5"
                        }
                    ],
                    "totalExpense": 0,
                    "totalIncome": 4110,
                    "netBalance": 4110
                }
            ],
            "total": 1,
            "page": null
        }
    },
    "message": "Accounts fetched successfully"
}
  */
const getAllAccountsBYAuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        const user = res.locals.user;
        //update filters with auth user info
        let filtesWithAuthUser = Object.assign({}, filters);
        // if user is agent then filter with agent id
        if (user.role === "farmer") {
            filtesWithAuthUser = Object.assign(Object.assign({}, filters), { "farmerInfo.Id": user._id });
        }
        // if user is doctor then filter with doctor id
        if (user.role === "doctor") {
            filtesWithAuthUser = Object.assign(Object.assign({}, filters), { "doctorInfo.Id": user._id });
        }
        const { total, page, accounts } = yield (0, accounts_service_1.getAll)(filtesWithAuthUser, queries);
        if (total === 0)
            throw new errors_1.ApiError(404, "No account found");
        res.ok({
            data: {
                accounts: (0, accounts_transformer_1.resTransformer)(accounts),
                total,
                page,
            },
        }, "Accounts fetched successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAccountsBYAuthUser = getAllAccountsBYAuthUser;
//# sourceMappingURL=accounts.controller.js.map