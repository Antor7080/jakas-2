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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const userCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.users");
const userSchema = new mongoose_1.default.Schema({
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
        Id: mongoose_1.default.Types.ObjectId,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            //  only run if password is modified, otherwise it will change every time we save the user!
            console.log("Password not modified");
            return next();
        }
        const password = this.password;
        const hashedPassword = yield bcrypt_1.default.hashSync(password, 10);
        this.password = hashedPassword;
        // this.confirmPassword = undefined;
        next();
    });
});
userSchema.statics.build = (attr) => {
    return new User(attr);
};
const User = connection_1.connection.jakas_poultryConnection.model("User", userSchema, userCollectionName);
exports.User = User;
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
        Id: new mongoose_1.default.Types.ObjectId("5f9f1b7b9b0b3c2a1c7b0b3c"),
    },
});
//# sourceMappingURL=user.model.js.map