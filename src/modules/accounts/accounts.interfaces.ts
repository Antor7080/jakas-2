import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { IAdder, IAuditTrail, IHensInfo } from "../../shared";

interface IAccount {
  hensInfo: IHensInfo; // batchInfo:  {batch_no, shed_no, hensTypes, hensCount, averageWeight, age}
  farmerInfo: IAdder; // {name, phone, zilla, upazilla, union, village}
  audit_trails: IAuditTrail; // {created_at, updated_at, deleted_at, created_by}
  expenses: ISingleExpense[]; 
  incomes: ISingleIncome[];
  totalExpense: number;
  totalIncome: number;
  netBalance: number;
};

interface ISingleExpense {
  amount: number;
  description: string;
  expenseDate: string;
  source: string;  
  entryDate: Date;
};

interface ISingleIncome {
  amount: number;
  source: string;
  description: string;
  incomeDate: string;
  entryDate: Date;
};

interface IAccountDoc extends IAccount, mongoose.Document {
    is_deleted: boolean;
    status: string;
};

type IAccountModel = mongoose.Model<IAccountDoc, IAccountQueryHelpers>;

interface IAccountQueryHelpers {
    notDeleted(): QueryWithHelpers<HydratedDocument<IAccountDoc>, IAccountQueryHelpers>
};

export { IAccount, IAccountDoc, IAccountModel, IAccountQueryHelpers, ISingleExpense, ISingleIncome };
