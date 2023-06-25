import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../../errors";
import { filterOption } from "../../helpers/filterOption";
import { IAccount, IAccountDoc } from "./accounts.interfaces";
import {
  addExpenseOrIncome,
  findById,
  findOneByQuery,
  getAll,
} from "./accounts.service";
import { resTransformer } from "./accounts.transformer";

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
const addOrUpdateAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hensInfo, singleIncomeOrExpense } = req.body;
    const user = res.locals.user;
    const account = await findOneByQuery({ "hensInfo.Id": hensInfo.Id });

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
      } else if (singleIncomeOrExpense.type === "expense") {
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
      } else {
        throw new ApiError(
          400,
          'Invalid data type. Expected "income" or "expense".'
        );
      }

      account.audit_trails.updated_at = new Date();
      // Update other audit_trails fields as needed

      await account.save();
      return res.ok({
        data: resTransformer(account),
        message: "Account updated successfully",
      });
    } else {
      const newAccountData: IAccount = {
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
      } else if (singleIncomeOrExpense.type === "expense") {
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
      } else {
        throw new ApiError(
          400,
          'Invalid data type. Expected "income" or "expense".'
        );
      }
      // create new account for this batch
      const newAccount = await addExpenseOrIncome(newAccountData);
      res.created({
        data: resTransformer(newAccount),
        message: "Account added successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

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

const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const account = await findById(id);
    res.ok({
      data: resTransformer(account),
      message: "Account fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

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

const getOneByBatchId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const account : IAccountDoc = await findOneByQuery({ "hensInfo.Id": batchId });
    if (!account) throw new ApiError(404, "No account infomation found");
    res.ok({
      data: resTransformer(account),
      message: "Account fetched successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
const getAllAccountsBYAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filters, queries } = filterOption(req);
    const user = res.locals.user;

    //update filters with auth user info
    let filtesWithAuthUser = { ...filters };

    // if user is agent then filter with agent id
    if (user.role === "farmer") {
      filtesWithAuthUser = { ...filters, "farmerInfo.Id": user._id };
    }

    // if user is doctor then filter with doctor id
    if (user.role === "doctor") {
      filtesWithAuthUser = { ...filters, "doctorInfo.Id": user._id };
    }

    const { total, page, accounts } = await getAll(filtesWithAuthUser, queries);
    if (total === 0) throw new ApiError(404, "No account found");
    res.ok(
      {
        data: {
          accounts: resTransformer(accounts),
          total,
          page,
        },
      },
      "Accounts fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

export {
  addOrUpdateAccounts,
  getAllAccountsBYAuthUser,
  getOneByBatchId,
  getOneById,
};
