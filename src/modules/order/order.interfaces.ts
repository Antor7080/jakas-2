import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { IAdder, IAuditTrail, IHensInfo } from "../../shared/index";

interface IOrder {
  hensInfo: IHensInfo;
  farmerInfo: IAdder;
  agent: IAdder;
  audit_trails: IAuditTrail;
  buyer: IAdder;
  price: number;
  hensCount: number;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
}

interface IOrderDoc extends IOrder, mongoose.Document {
  is_deleted: boolean;
  status: string;
}

type IOrderModel = Model<IOrderDoc, IOrderQueryHelpers>;
interface IOrderQueryHelpers {
  notDeleted(): QueryWithHelpers<
    HydratedDocument<IOrderDoc>,
    IOrderQueryHelpers
  >;
}
export { IOrder, IOrderDoc, IOrderModel, IOrderQueryHelpers };
