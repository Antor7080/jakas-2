const transformedEntity: any = (params: any) => {
  let entityTransformed: object[] = [];

  if (params && Array.isArray(params)) {
    params.forEach((feedOrder) => {
      entityTransformed.push(resEntity(feedOrder));
    });
    return entityTransformed;
  }

  return resEntity(params);
};

const resEntity = (feedOrder: any) => {
  const entity: any = {
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

export { transformedEntity as resTransformer };
