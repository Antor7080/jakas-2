import bcrypt from "bcrypt";
import config from "config";
import mongoose from "mongoose";

import { connection } from "../../db/connection";
import { IUser, IUserDoc, userModelInterface } from "./user.interfaces";

const userCollectionName = config.get<string>(
  "db.connection.jakas_poultry.collections.users"
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      default: "farmer",
      enum: [
        "admin",
        "agent",
        "farmer",
        "superAdmin",
        "doctor",
        "feedSeller",
        "buyer",
      ],
    },
    password: {
      type: String,
      required: true,
    },

    zilla: String,
    upazilla: String,
    union: String,
    village: String,
    addedBy: {
      name: String,
      phone: String,
      role: String,
      Id: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified, otherwise it will change every time we save the user!
    console.log("Password not modified");
    return next();
  }
  const password = this.password;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  this.password = hashedPassword;
  // this.confirmPassword = undefined;

  next();
});

userSchema.statics.build = (attr: IUser & { confirmPassword: string }) => {
  return new User(attr);
};

const User = connection.jakas_poultryConnection.model<
  IUserDoc,
  userModelInterface
>("User", userSchema, userCollectionName);

User.build({
  name: "mostak_ahmad",
  phone: "01792448092",
  role: "farmer",
  password: "123456",
  zilla: "dhaka",
  upazilla: "savar",
  union: "kashemabad",
  village: "kashemabad",
  addedBy: {
    name: "mostak_ahmad",
    phone: "01792448092",
    role: "farmer",
    Id: new mongoose.Types.ObjectId("5f9f1b7b9b0b3c2a1c7b0b3c"),
  },
});

export { User };
