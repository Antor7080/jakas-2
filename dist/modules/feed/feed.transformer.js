"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const transformedEntity = (params) => {
    let entityTransformed = [];
    if (params && Array.isArray(params)) {
        params.forEach((feedOrder) => {
            entityTransformed.push(resEntity(feedOrder));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = transformedEntity;
const resEntity = (feedOrder) => {
    const entity = {
        _id: feedOrder._id,
        hensInfo: feedOrder.hensInfo,
        farmerInfo: feedOrder.farmerInfo,
        feedSaller: feedOrder.feedSaller,
        feeds: feedOrder.feeds,
        feedTotalPrice: feedOrder.feedTotalPrice,
        feedDate: feedOrder.feedDate,
        agent: feedOrder.agent,
        audit_trails: feedOrder.audit_trails,
        addedBy: feedOrder.addedBy,
        createdAt: feedOrder.createdAt,
        updatedAt: feedOrder.updatedAt,
    };
    return entity;
};
//# sourceMappingURL=feed.transformer.js.map