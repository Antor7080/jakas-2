"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// storage function to store file in public/uploads folder
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname.split(" ").join("-"));
    },
});
// exports upload function with fileFilter to check file type 
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png") {
            cb(null, true);
        }
        else {
            cb(new Error("only .jpg, .jpeg and .png are allowed."));
        }
    },
});
//# sourceMappingURL=fileUpload.js.map