"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const transformedEntity = (params) => {
    let entityTransformed = [];
    if (params && Array.isArray(params)) {
        params.forEach((order) => {
            entityTransformed.push(resEntity(order));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = transformedEntity;
const resEntity = (order) => {
    const entity = {
        _id: order._id,
        hensInfo: order.hensInfo,
        farmerInfo: order.farmerInfo,
        agent: order.agent,
        buyer: order.buyer,
        addedBy: order.addedBy,
        price: order.price,
        hensCount: order.hensCount,
        weight: order.weight,
        totalPrice: order.totalPrice,
        audit_trails: order.audit_trails,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
    };
    return entity;
};
//# sourceMappingURL=res.transformer.js.map