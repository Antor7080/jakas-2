import mongoose, { HydratedDocument, Model, QueryWithHelpers } from "mongoose";
import { IAdder, IAuditTrail } from "../../shared/index";
interface IBatchInfo {
  //step 1
  batch_no: number; //batch_no and shed_no is combined unique
  shed_no: number; //batch_no and shed_no is combined unique
  hensTypes: string;
  hensCount: number;
  hensPrice: number;
  batchStartDate: string;

  //step 2
  sprayed_disinfectants: boolean;
  bleaching_cleaned: boolean;
  isFumigation: boolean;
  isBufferZone: boolean;
  isFootBaths: boolean;
  entrySpary: boolean;
  isDeadAnimal: boolean;

  //src step 3
  company_name?: string;
  isGovt?: boolean;
  other?: string;

  //food step 4
  safeWater: boolean;
  isWaterTest: boolean;
  food_company_name?: string;
  other_food_company?: string;
  water_test_method?: string;
  other_water_test?: string;

  isPreBiotic: boolean;
  Probiotics_days?: number;
  isWithdrwalFollow?: boolean;

  antibiotics_days?: number;
  doctorAdvice: boolean;
  advicer_type?: string;
  prescription: string[];

  dlsRegistered: boolean;
  DLS_regi_no?: string;
  isCertified?: boolean;

  vaccine: IVaccine[];
  is40_42_days?: boolean;
  selling_age: number;
  isGrowth_chart_used: boolean;
  growthWeek1: number;
  growthWeek2: number;
  growthWeek3: number;
  growthWeek4: number;
  growthWeek5: number;
  growthWeek6: number;
  growthWeek7: number;
  growthWeek8: number;
  growthWeek9: number;
  wasteRemoval: string;
  average_weight: number;
  weight_count_age: number;
  expectedPrice: number;
  totalSale: number;
  pricePerKg: number;
  available_for_sale_count: number;
  addedBy: mongoose.Types.ObjectId;
}
interface IBatchInfoDoc extends mongoose.Document {
  //step 1
  batch_no: number; //batch_no and shed_no is combined unique
  shed_no: number; //batch_no and shed_no is combined unique
  hensTypes: string;
  hensCount: number;
  hensPrice: number;
  batchStartDate: string;

  //step 2
  sprayed_disinfectants: boolean;
  bleaching_cleaned: boolean;
  isFumigation: boolean;
  isBufferZone: boolean;
  isFootBaths: boolean;
  entrySpary: boolean;
  isDeadAnimal: boolean;

  //src step 3
  company_name?: string;
  isGovt?: boolean;
  other?: string;

  //food step 4
  safeWater: boolean;
  isWaterTest: boolean;
  food_company_name?: string;
  other_food_company?: string;
  water_test_method?: string;
  other_water_test?: string;

  isPreBiotic: boolean;
  Probiotics_days?: number;
  isWithdrwalFollow?: boolean;

  antibiotics_days?: number;
  doctorAdvice: boolean;
  advicer_type?: string;
  prescription: string[];

  dlsRegistered: boolean;
  DLS_regi_no?: string;
  isCertified?: boolean;

  vaccine: IVaccine[];
  is40_42_days?: boolean;
  selling_age: number;
  isGrowth_chart_used: boolean;
  growthWeek1: number;
  growthWeek2: number;
  growthWeek3: number;
  growthWeek4: number;
  growthWeek5: number;
  growthWeek6: number;
  growthWeek7: number;
  growthWeek8: number;
  growthWeek9: number;
  wasteRemoval: string;
  average_weight: number;
  weight_count_age: number;
  status: string;
  qr_code?: string;
  farmer: IAdder;
  agent: IAdder;
  mortality: IMortality[];
  audit_trails: IAuditTrail;
  addedBy: mongoose.Types.ObjectId;
  expectedPrice: number;
  totalSale: number;
  pricePerKg: number;
  available_for_sale_count: number;
  is_deleted: boolean;
  id: number;
}

interface IVaccine {
  name?: string;
  age: number;
  otherVaccineName?: string;
}

interface IMortality {
  age: number;
  count: number;
  date: string;
}
// interface IBatchInfoQueryHelpers {
//   notDeleted(): QueryWithHelpers<
//     HydratedDocument<IBatchInfoDoc>,
//     HydratedDocument<IBatchInfoDoc>,
//     IBatchInfoQueryHelpers
//   >;
// }
interface IBatchInfoQueryHelpers {
  notDeleted(): QueryWithHelpers<
    HydratedDocument<IBatchInfoDoc>,
    HydratedDocument<IBatchInfoDoc>,
    IBatchInfoQueryHelpers
  >;
}

type BatchModelType = Model<IBatchInfoDoc, IBatchInfoQueryHelpers>;

export { BatchModelType, IBatchInfo, IBatchInfoDoc, IBatchInfoQueryHelpers };
