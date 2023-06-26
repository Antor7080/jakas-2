"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const generateQRCode = (text, id) => {
    qrcode_1.default.toFile(`public/uploads/${id}.png`, text, {
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
            dark: "#010599FF",
            light: "#FFFFFFFF"
        },
        width: 450
    }, function (err) {
        if (err)
            throw err;
    });
    return id + '.png';
};
exports.generateQRCode = generateQRCode;
//# sourceMappingURL=qr_code.js.map