import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors";
import { IAdder } from "../../shared";
import { IUserDoc } from "../users/user.interfaces";
import { getById as getUserById } from "../users/user.service";

import mongoose from "mongoose";
import { filterOption } from "../../helpers/filterOption";
import {
  IMedicine,
  IPrescription,
  IPrescriptionDoc,
} from "./prescription.interfaces";
import {
  create,
  getAll,
  getById as getOneById,
  givePrescription as prescriptionGive,
} from "./prescription.services";
import { resTransformer } from "./prescription.transformer";

/**
 * 
 * @objective : To request a prescription
 * @endpoint : /v1/api/prescription/request
 * @method : POST
 * @authentications : User
 * @reqBody: {
    "doctorId": "648404ee66c4a4b7f0da9bc6",
     "hensInfo": {
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 575,
        "Id": "647d7308b4be402d335a0467"
    },
     "symptoms": [
      "Paralysis of one or both legs",
      "Weight loss",
      "Tumors or swellings around the feather follicles",
      "Grayish iris or irregular pupil shape",
      "Decreased egg production",
      "Nervous system disorders (partial or complete paralysis)"
    ]

}
@res : {
    "success": true,
    "code": 201,
    "data": {
        "_id": "64840763e7cf580123633e01",
        "farmerInfo": {
            "name": "user2",
            "phone": "01900000001",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c6ca4cf30aa3ec97d6fb"
        },
        "doctorInfo": {
            "name": "user2",
            "phone": "01900000090",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "648404ee66c4a4b7f0da9bc6"
        },
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "symptoms": [
            "Paralysis of one or both legs",
            "Weight loss",
            "Tumors or swellings around the feather follicles",
            "Grayish iris or irregular pupil shape",
            "Decreased egg production",
            "Nervous system disorders (partial or complete paralysis)"
        ],
        "hensInfo": {
            "batch_no": 50,
            "shed_no": 3,
            "hensTypes": "সোনালী",
            "hensCount": 575,
            "Id": "647d7308b4be402d335a0467"
        },
        "medicines": [],
        "audit_trails": {
            "created_at": "2023-06-10T05:17:23.508Z",
            "created_by": "6475c6ca4cf30aa3ec97d6fb",
            "created_detail": "Prescription Requested By user2 (01900000001)"
        }
    },
    "message": "Prescription Requested Successfully"
}
 */
const prescriptionRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const doctorExist: IUserDoc | null = await getUserById(req.body.doctorId);
    if (!doctorExist) throw new ApiError(404, "Doctor Not Found");
    const farmer: IAdder = {
      name: user.name,
      phone: user.phone,
      zilla: user.zilla,
      upazilla: user.upazilla,
      union: user.union,
      village: user.village,
      Id: user._id,
      role: user.role,
    };
    const agent: IAdder = user.addedBy;
    const doctor: IAdder = {
      name: doctorExist.name,
      phone: doctorExist.phone,
      zilla: doctorExist.zilla,
      upazilla: doctorExist.upazilla,
      union: doctorExist.union,
      village: doctorExist.village,
      Id: doctorExist._id,
    };
    const info: IPrescription = {
      ...req.body,
      hensInfo: req.body.hensInfo,
      farmerInfo: farmer,
      doctorInfo: doctor,
      agent: agent,
      addedBy: user._id,
      audit_trails: {
        created_by: user._id,
        created_at: new Date(),
        created_detail: `Prescription Requested By ${user.name} (${user.phone})`,
      },
    };
    const prescription = await create(info);
    const resPrescription = resTransformer(prescription);
    res.created(resPrescription, "Prescription Requested Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @objective : To get a prescription by id
 * @endpoint : /v1/api/prescription/:id
 * @method : GET
 * @param : id
 * @res body: {
    "success": true,
    "code": 200,
    "data": {
        "_id": "6484099ebfa056a1d68b539e",
        "farmerInfo": {
            "name": "user2",
            "phone": "01900000001",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c6ca4cf30aa3ec97d6fb"
        },
        "doctorInfo": {
            "name": "user2",
            "phone": "01900000090",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "648404ee66c4a4b7f0da9bc6"
        },
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "symptoms": [
            "Paralysis of one or both legs",
            "Weight loss",
            "Tumors or swellings around the feather follicles",
            "Grayish iris or irregular pupil shape",
            "Decreased egg production",
            "Nervous system disorders (partial or complete paralysis)"
        ],
        "hensInfo": {
            "batch_no": 50,
            "shed_no": 3,
            "hensTypes": "সোনালী",
            "hensCount": 575,
            "Id": "647d7308b4be402d335a0467"
        },
        "medicines": [],
        "audit_trails": {
            "created_at": "2023-06-10T05:26:54.851Z",
            "created_by": "6475c6ca4cf30aa3ec97d6fb",
            "created_detail": "Prescription Requested By user2 (01900000001)"
        },
        "status": "অপেক্ষারত"
    },
    "message": "Prescription Found"
}
 */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const prescription: IPrescriptionDoc = await getOneById(_id);
    if (!prescription) throw new ApiError(404, "Prescription Not Found");
    const resPrescription = resTransformer(prescription);
    res.ok(resPrescription, "Prescription Found");
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @objective : To get prescriptions by auth user
 * @endpoint : /v1/api/prescription
 * @method : GET
 * @authentications : User
 * @res body: {
    "success": true,
    "code": 200,
    "data": {
        "total": 5,
        "page": null,
        "prescription": [
            {
                "_id": "64843bf8c49f9d38fe36edb4",
                "farmerInfo": {
                    "name": "user2",
                    "phone": "01900000001",
                    "zilla": "Dhaka",
                    "upazilla": "Mirpur",
                    "union": "Shewrapara",
                    "village": "N/A",
                    "Id": "6475c6ca4cf30aa3ec97d6fb"
                },
                "doctorInfo": {
                    "name": "user2",
                    "phone": "01900000090",
                    "zilla": "Dhaka",
                    "upazilla": "Mirpur",
                    "union": "Shewrapara",
                    "village": "N/A",
                    "Id": "648404ee66c4a4b7f0da9bc6"
                },
                "agent": {
                    "phone": "01986297080",
                    "name": "Antor",
                    "Id": "6475bef77b9d56801cfb7d98"
                },
                "symptoms": [
                    "Paralysis of one or both legs",
                    "Weight loss",
                    "Tumors or swellings around the feather follicles",
                    "Grayish iris or irregular pupil shape",
                    "Decreased egg production",
                    "Nervous system disorders (partial or complete paralysis)"
                ],
                "hensInfo": {
                    "batch_no": 50,
                    "shed_no": 3,
                    "hensTypes": "সোনালী",
                    "hensCount": 575,
                    "averageWeight": 2,
                    "age": 30,
                    "Id": "647d7308b4be402d335a0467"
                },
                "medicines": [
                    {
                        "medicineName": "test1",
                        "medicineQuantity": 100,
                        "medicineType": "tablet",
                        "medicineDose": "1+1+1",
                        "medicineDuration": "10",
                        "medicineNote": "something something something something something something something something something something something something ",
                        "_id": "648440b93b0b4130c5dd469d"
                    },
                    {
                        "medicineName": "test1",
                        "medicineQuantity": 100,
                        "medicineType": "tablet",
                        "medicineDose": "1+1+1",
                        "medicineDuration": "10",
                        "medicineNote": "something something something something something something something something something something something something ",
                        "_id": "648440b93b0b4130c5dd469e"
                    },
                    {
                        "medicineName": "test1",
                        "medicineQuantity": 100,
                        "medicineType": "tablet",
                        "medicineDose": "1+1+1",
                        "medicineDuration": "10",
                        "medicineNote": "something something something something something something something something something something something something ",
                        "_id": "648440b93b0b4130c5dd469f"
                    }
                ],
                "addedBy": "6475c6ca4cf30aa3ec97d6fb",
                "audit_trails": {
                    "created_at": "2023-06-10T09:01:44.291Z",
                    "created_by": "6475c6ca4cf30aa3ec97d6fb",
                    "created_detail": "Prescription Requested By user2 (01900000001)",
                    "updated_at": "2023-06-10T09:22:01.412Z",
                    "updated_by": "648404ee66c4a4b7f0da9bc6",
                    "updated_detail": "Prescription Given By user2 (01900000090)"
                },
                "status": "সম্পন্ন"
            }
        ]
    },
    "message": "Prescription Found"
}
 */
const getPrescriptionByAuthUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const { filters, queries } = filterOption(req);
    let filtersWithAuthUser = { ...filters };
    if (user.role === "doctor") {
      filtersWithAuthUser = {
        ...filtersWithAuthUser,
        "doctorInfo.Id": user._id,
      };
    }
    if (user.role === "farmer") {
      filtersWithAuthUser = {
        ...filtersWithAuthUser,
        "farmerInfo.Id": user._id,
      };
    }
    if (user.role === "agent") {
      filtersWithAuthUser = { ...filtersWithAuthUser, "agent.Id": user._id };
    }

    const { total, page, prescription } = await getAll(
      filtersWithAuthUser,
      queries
    );

    if (total < 1) throw new ApiError(404, "Prescription Not Found");
    const resPrescription = resTransformer(prescription);
    res.ok(
      { total, page, prescription: resPrescription },
      "Prescription Found"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @objective : To give a prescription
 * @endpoint : /v1/api/prescription/:id
 * @method : PUT
 * @param : id
 * @reqBody: {
    "medicines": [
        {
            "medicineName": "test1",
            "medicineQuantity": 100,
            "medicineType": "tablet",
            "medicineDose": "1+1+1",
            "medicineDuration": "10",
            "medicineNote": "something something something something something something something something something something something something "
        },
        {
            "medicineName": "test1",
            "medicineQuantity": 100,
            "medicineType": "tablet",
            "medicineDose": "1+1+1",
            "medicineDuration": "10",
            "medicineNote": "something something something something something something something something something something something something "
        },
        {
            "medicineName": "test1",
            "medicineQuantity": 100,
            "medicineType": "tablet",
            "medicineDose": "1+1+1",
            "medicineDuration": "10",
            "medicineNote": "something something something something something something something something something something something something "
        }
    ]
}
@res : {
    "success": true,
    "code": 200,
    "data": {
        "_id": "64843bf8c49f9d38fe36edb4",
        "farmerInfo": {
            "name": "user2",
            "phone": "01900000001",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c6ca4cf30aa3ec97d6fb"
        },
        "doctorInfo": {
            "name": "user2",
            "phone": "01900000090",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "648404ee66c4a4b7f0da9bc6"
        },
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "symptoms": [
            "Paralysis of one or both legs",
            "Weight loss",
            "Tumors or swellings around the feather follicles",
            "Grayish iris or irregular pupil shape",
            "Decreased egg production",
            "Nervous system disorders (partial or complete paralysis)"
        ],
        "hensInfo": {
            "batch_no": 50,
            "shed_no": 3,
            "hensTypes": "সোনালী",
            "hensCount": 575,
            "averageWeight": 2,
            "age": 30,
            "Id": "647d7308b4be402d335a0467"
        },
        "medicines": [
            {
                "medicineName": "test1",
                "medicineQuantity": 100,
                "medicineType": "tablet",
                "medicineDose": "1+1+1",
                "medicineDuration": "10",
                "medicineNote": "something something something something something something something something something something something something ",
                "_id": "64843da724e7305fb42caffb"
            },
            {
                "medicineName": "test1",
                "medicineQuantity": 100,
                "medicineType": "tablet",
                "medicineDose": "1+1+1",
                "medicineDuration": "10",
                "medicineNote": "something something something something something something something something something something something something ",
                "_id": "64843da724e7305fb42caffc"
            },
            {
                "medicineName": "test1",
                "medicineQuantity": 100,
                "medicineType": "tablet",
                "medicineDose": "1+1+1",
                "medicineDuration": "10",
                "medicineNote": "something something something something something something something something something something something something ",
                "_id": "64843da724e7305fb42caffd"
            }
        ],
        "addedBy": "6475c6ca4cf30aa3ec97d6fb",
        "audit_trails": {
            "created_at": "2023-06-10T09:01:44.291Z",
            "created_by": "6475c6ca4cf30aa3ec97d6fb",
            "created_detail": "Prescription Requested By user2 (01900000001)",
            "updated_at": "2023-06-10T09:08:55.510Z",
            "updated_by": "648404ee66c4a4b7f0da9bc6",
            "updated_detail": "Prescription Given By user2 (01900000090)"
        },
        "status": "সম্পন্ন"
    },
    "message": "Prescription Given Successfully"
}
  */

const givePrescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id
    );
    const medicines: IMedicine[] = req.body.medicines;
    if (!medicines?.length) throw new ApiError(400, "Medicines Required");

    const updateBody = {
      ...req.body,
      treatmentDate: new Date(),
      status: "সম্পন্ন",
    };
    const audit_trails = {
      updated_by: user._id,
      updated_detail: `Prescription Given By ${user.name} (${user.phone})`,
    };
    const prescription = await prescriptionGive(id, updateBody, audit_trails);
    if (!prescription) throw new ApiError(404, "Prescription Not Found");
    const resPrescription = resTransformer(prescription);
    res.ok(resPrescription, "Prescription Given Successfully");
  } catch (error) {
    next(error);
  }
};
export {
  getById,
  getPrescriptionByAuthUser,
  givePrescription,
  prescriptionRequest,
};
