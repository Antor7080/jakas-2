import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { IAdder, IAuditTrail, IHensInfo } from "../../shared/index";

interface IFeed {
  hensInfo: IHensInfo;
  farmerInfo: IAdder;
  agent: IAdder;
  audit_trails: IAuditTrail;
  addedBy: mongoose.Types.ObjectId;
  feeds: ISingleFeed[];
  feedTotalPrice: number;
  feedDate: string;
  feedSaller: IAdder;
}
interface ISingleFeed {
  feedType: string;
  feedName: string;
  feedQuantity: number;
  feedUnit?: string;
  feedUnitPrice?: number;
  feedPrice: number;
}

interface IFeedDoc extends IFeed, mongoose.Document {
  is_deleted: boolean;
  status: string;
}

type IFeedModel = Model<IFeedDoc, IFeedQueryHelpers>;
interface IFeedQueryHelpers {
  notDeleted(): QueryWithHelpers<HydratedDocument<IFeedDoc>, IFeedQueryHelpers>;
}
export { IFeed, IFeedDoc, IFeedModel, IFeedQueryHelpers, ISingleFeed };
