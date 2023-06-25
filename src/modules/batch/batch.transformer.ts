const transformedEntity: any = (params: any, role: string) => {
  let entityTransformed: object[] = [];

  if (params && Array.isArray(params)) {
    params.forEach((batchInfo) => {
      entityTransformed.push(resEntity(batchInfo, role));
    });
    return entityTransformed;
  }

  return resEntity(params, role);
};

const resEntity = (batchInfo: any, role: string) => {
  const totalDeath = batchInfo.mortality
    ? batchInfo.mortality.reduce((a: any, b: any) => a + b.count, 0)
    : 0;
  //calculate current age
  const batchStartDate = new Date(batchInfo.batchStartDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - batchStartDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalavailable =
    batchInfo.hensCount -
    totalDeath -
    (batchInfo.totalSale ? batchInfo.totalSale : 0);
  let farmer: any = {
    name: batchInfo.farmer.name,
    zilla: batchInfo.farmer.zilla,
    Id: batchInfo.farmer.Id,
  };
  if (
    role === "admin" ||
    role === "agent" ||
    role === "farmer" ||
    role === "feedSaller" ||
    role === "doctor"
  ) {
    farmer = {
      ...batchInfo.farmer,
    };
  }
  const entity: any = {
    _id: batchInfo._id,
    batch_no: batchInfo.batch_no,
    shed_no: batchInfo.shed_no,
    hensTypes: batchInfo.hensTypes,
    hensCount: batchInfo.hensCount,
    hensPrice: batchInfo.hensPrice,
    batchStartDate: batchInfo.batchStartDate,
    sprayed_disinfectants: batchInfo.sprayed_disinfectants,
    bleaching_cleaned: batchInfo.bleaching_cleaned,
    isFumigation: batchInfo.isFumigation,
    isBufferZone: batchInfo.isBufferZone,
    isFootBaths: batchInfo.isFootBaths,
    entrySpary: batchInfo.entrySpary,
    isDeadAnimal: batchInfo.isDeadAnimal,
    company_name: batchInfo.company_name,
    isGovt: batchInfo.isGovt,
    other: batchInfo.other,
    food_company_name: batchInfo.food_company_name,
    other_food_company: batchInfo.other_food_company,
    water_test_method: batchInfo.water_test_method,
    Probiotics_days: batchInfo.Probiotics_days,
    isWithdrwalFollow: batchInfo.isWithdrwalFollow,
    antibiotics_days: batchInfo.antibiotics_days,
    advicer_type: batchInfo.advicer_type,
    prescription: batchInfo.prescription,
    DLS_regi_no: batchInfo.DLS_regi_no,
    isCertified: batchInfo.isCertified,
    vaccine: batchInfo.vaccine,
    is40_42_days: batchInfo.is40_42_days,
    selling_age: batchInfo.selling_age,
    isGrowth_chart_used: batchInfo.isGrowth_chart_used,
    growthWeek1: batchInfo.growthWeek1,
    growthWeek2: batchInfo.growthWeek2,
    growthWeek3: batchInfo.growthWeek3,
    growthWeek4: batchInfo.growthWeek4,
    growthWeek5: batchInfo.growthWeek5,
    growthWeek6: batchInfo.growthWeek6,
    growthWeek7: batchInfo.growthWeek7,
    growthWeek8: batchInfo.growthWeek8,
    growthWeek9: batchInfo.growthWeek9,
    wasteRemoval: batchInfo.wasteRemoval,
    average_weight: batchInfo.average_weight,
    weight_count_age: batchInfo.weight_count_age,
    qr_code: batchInfo.qr_code,
    agent: batchInfo.agent,
    status: batchInfo.status,
    isWaterTest: batchInfo.isWaterTest,
    isPreBiotic: batchInfo.isPreBiotic,
    doctorAdvice: batchInfo.doctorAdvice,
    dlsRegistered: batchInfo.dlsRegistered,
    safeWater: batchInfo.safeWater,
    other_water_test: batchInfo.other_water_test,
    farmer: farmer,
    addedBy: batchInfo.addedBy,
    audit_trails: batchInfo.audit_trails,
    mortality: batchInfo.mortality,
    totalDeath: totalDeath,
    totalavailable: totalavailable,
    expectedPrice:
      role === "farmer" || role === "agent" || role === "admin"
        ? batchInfo.expectedPrice
        : undefined,
    totalSale: batchInfo.totalSale ? batchInfo.totalSale : undefined,
    pricePerKg:
      role === "farmer"
        ? undefined
        : batchInfo.pricePerKg
        ? batchInfo.pricePerKg
        : undefined,
    available_for_sale: batchInfo.available_for_sale
      ? batchInfo.available_for_sale
      : undefined,
    available_for_sale_count: batchInfo.available_for_sale_count
      ? batchInfo.available_for_sale_count
      : undefined,
    // pricePerKg: batchInfo.pricePerKg? batchInfo.pricePerKg: undefined,
    age: diffDays,
    id: batchInfo.id,
    createdAt: batchInfo.createdAt,
    updatedAt: batchInfo.updatedAt,
  };

  return entity;
};

export { transformedEntity as resTransformer };
