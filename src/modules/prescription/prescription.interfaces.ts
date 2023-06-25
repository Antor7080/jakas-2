import mongoose, { HydratedDocument,Document, Model, QueryWithHelpers } from "mongoose";
import { IAdder, IAuditTrail, IHensInfo } from "../../shared/index";

interface IPrescription {
  hensInfo: IHensInfo; // hen's info
  symptoms: ISymptoms; // fever, cold, cough, headache
  farmerInfo: IAdder;
  agent: IAdder;
  audit_trails: IAuditTrail;
  addedBy: mongoose.Types.ObjectId;
  medicines: IMedicine[];
  doctorInfo: IAdder;
  status: string;
  diseaseName: string;
  adviceNote: string;
  followupDate: Date;
  medicineTotalPrice: number;
  prescriptionNote: string;
  treatmentDate: Date;
}
interface IMedicine {
  medicineName: string; // paracetamol, amoxicillin, ciprofloxacin
  medicineQuantity: number; // 1 piece, 1 bottle, 1 box
  medicineUnitPrice: number;  // 1 piece price
  medicinePrice: number; // medicineQuantity * medicineUnitPrice
  medicineType: string; // tablet, capsule, syrup, powder, injection
  medicineDose: string; // 1+1+1, 1+0+1, 0+0+1
  medicineDuration: string; // 5 days, 10 days
  medicineNote: string;
  prescriptionNote: string;

}
interface ISymptoms {
  beakArr: string[];
  wattleArr: string[];
  combArr : string[];
  eyeArr: string[];
  earArr: string[];
  headArr: string[];
  featherArr: string[];
  droppingArr: string[];
  respiratoryArr: string[];
  nervousArr: string[];
  locomotoryArr: string[];
  alimentaryArr: string[];
  skinArr: string[];
  medicalComplaints: string;
}

interface IPrescriptionDoc extends IPrescription, Document {
  is_deleted: boolean;
  status: string;
  audit_trails: IAuditTrail;
  
}

type IPrescriptionModel = Model<IPrescriptionDoc, IPrescriptionQueryHelpers>;
interface IPrescriptionQueryHelpers {
  notDeleted(): QueryWithHelpers<
    HydratedDocument<IPrescriptionDoc>,
    IPrescriptionQueryHelpers
  >;
}
export {
  IMedicine,
  IPrescription,
  IPrescriptionDoc,
  IPrescriptionModel,
  IPrescriptionQueryHelpers,
};
