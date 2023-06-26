"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const transformedEntity = (params) => {
    let entityTransformed = [];
    if (params && Array.isArray(params)) {
        params.forEach((farmerInfo) => {
            entityTransformed.push(resEntity(farmerInfo));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = transformedEntity;
const resEntity = (farmerInfo) => {
    const entity = {
        _id: farmerInfo._id,
        phone: farmerInfo.phone,
        name: farmerInfo.name,
        zilla: farmerInfo.zilla,
        upazilla: farmerInfo.upazilla,
        union: farmerInfo.union,
        village: farmerInfo.village,
        batch: farmerInfo.batch,
        hensTypes: farmerInfo.hensTypes,
        hensCount: farmerInfo.hensCount,
        hensPrice: farmerInfo.hensPrice,
        batchStartDate: farmerInfo.batchStartDate,
        sprayed_disinfectants: farmerInfo.sprayed_disinfectants,
        bleaching_cleaned: farmerInfo.bleaching_cleaned,
        isFumigation: farmerInfo.isFumigation,
        isBufferZone: farmerInfo.isBufferZone,
        isFootBaths: farmerInfo.isFootBaths,
        entrySpary: farmerInfo.entrySpary,
        isDeadAnimal: farmerInfo.isDeadAnimal,
        company_name: farmerInfo.company_name,
        isGovt: farmerInfo.isGovt,
        other: farmerInfo.other,
        food_company_name: farmerInfo.food_company_name,
        other_food_company: farmerInfo.other_food_company,
        water_test_method: farmerInfo.water_test_method,
        Probiotics_days: farmerInfo.Probiotics_days,
        isWithdrwalFollow: farmerInfo.isWithdrwalFollow,
        antibiotics_days: farmerInfo.antibiotics_days,
        advicer_type: farmerInfo.advicer_type,
        prescription: farmerInfo.prescription,
        DLS_regi_no: farmerInfo.DLS_regi_no,
        isCertified: farmerInfo.isCertified,
        vaccine: farmerInfo.vaccine,
        is40_42_days: farmerInfo.is40_42_days,
        selling_age: farmerInfo.selling_age,
        isGrowth_chart_used: farmerInfo.isGrowth_chart_used,
        growthWeek1: farmerInfo.growthWeek1,
        growthWeek2: farmerInfo.growthWeek2,
        growthWeek3: farmerInfo.growthWeek3,
        growthWeek4: farmerInfo.growthWeek4,
        growthWeek5: farmerInfo.growthWeek5,
        growthWeek6: farmerInfo.growthWeek6,
        growthWeek7: farmerInfo.growthWeek7,
        growthWeek8: farmerInfo.growthWeek8,
        growthWeek9: farmerInfo.growthWeek9,
        wasteRemoval: farmerInfo.wasteRemoval,
        average_weight: farmerInfo.average_weight,
        weight_count_age: farmerInfo.weight_count_age,
        qr_code: farmerInfo.qr_code,
        agent: farmerInfo.agent,
        status: farmerInfo.status,
        isWaterTest: farmerInfo.isWaterTest,
        isPreBiotic: farmerInfo.isPreBiotic,
        doctorAdvice: farmerInfo.doctorAdvice,
        dlsRegistered: farmerInfo.dlsRegistered,
        safeWater: farmerInfo.safeWater,
        other_water_test: farmerInfo.other_water_test,
    };
    return entity;
};
//# sourceMappingURL=farmerInfo.transformer.js.map