const transformedEntity: any = (params: any) => {
  let entityTransformed: object[] = [];

  if (params && Array.isArray(params)) {
    params.forEach((prescription) => {
      entityTransformed.push(resEntity(prescription));
    });
    return entityTransformed;
  }

  return resEntity(params);
};

const resEntity = (prescription: any) => {
  const entity: any = {
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

export { transformedEntity as resTransformer };
