import mongoose from "mongoose";

interface IUser {
  name: string;
  phone: string;
  role: string;
  password: string;
  zilla: string;
  upazilla: string;
  union: string;
  village: string;
  addedBy: AddedBy;
}

interface IUserDoc extends mongoose.Document {
  name: string;
  phone: string;
  role: string;
  password: string;
  zilla: string;
  upazilla: string;
  union: string;
  village: string;
  addedBy: AddedBy;
}
interface AddedBy {
  name: string;
  phone: string;
  role: string;
  Id: mongoose.Types.ObjectId;
}

interface userModelInterface extends mongoose.Model<IUserDoc> {
  build(attr: IUser): IUserDoc;
}

//merge two models type

export { AddedBy, IUser, IUserDoc, userModelInterface };
