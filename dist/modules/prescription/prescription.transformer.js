"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const transformedEntity = (params) => {
    let entityTransformed = [];
    if (params && Array.isArray(params)) {
        params.forEach((prescription) => {
            entityTransformed.push(resEntity(prescription));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = transformedEntity;
const resEntity = (prescription) => {
    const entity = {
        _id: prescription._id,
        farmerInfo: prescription.farmerInfo,
        doctorInfo: prescription.doctorInfo,
        agent: prescription.agent,
        symptoms: prescription.symptoms,
        hensInfo: prescription.hensInfo,
        medicines: prescription.medicines,
        addedBy: prescription.addedBy,
        medicineTotalPrice: prescription.medicineTotalPrice,
        audit_trails: prescription.audit_trails,
        status: prescription.status,
        diseaseName: prescription.diseaseName,
        adviceNote: prescription.adviceNote,
        followupDate: prescription.followupDate,
        prescriptionNote: prescription.prescriptionNote,
        treatmentDate: prescription.treatmentDate,
        createdAt: prescription.createdAt,
        updatedAt: prescription.updatedAt,
    };
    return entity;
};
//# sourceMappingURL=prescription.transformer.js.map