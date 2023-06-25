import { Response } from "express";
import mongoose from "mongoose";

interface IAuditTrail {
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
  created_detail?: string;
  updated_detail?: string;
  deleted_detail?: string;
  admin_note?: string;
}

interface IAdder {
  name: string;
  phone: string;
  role?: string;
  zilla?: string;
  upazilla?: string;
  union?: string;
  village?: string;
  Id: mongoose.Types.ObjectId;
}
interface IHensInfo {
  batch_no: number; //batch_no and shed_no is combined unique
  shed_no: number; //batch_no and shed_no is combined unique
  hensTypes: string;
  hensCount: number;
  averageWeight: number;
  age: number;

  Id: mongoose.Types.ObjectId;
}


export { IAuditTrail, IAdder, IHensInfo };
