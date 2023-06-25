import { ObjectId } from 'mongoose';
import qrcode from 'qrcode';

export const generateQRCode = (text: string, id: ObjectId): string => {
    qrcode.toFile(`public/uploads/${id}.png`, text, {
        errorCorrectionLevel: 'H',

        margin: 1,
        color: {
            dark: "#010599FF",
            light: "#FFFFFFFF"
        },
        width: 450
    }, function (err) {
        if (err) throw err;
    });
    return id + '.png';

}