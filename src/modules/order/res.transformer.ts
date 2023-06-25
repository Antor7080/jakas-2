const transformedEntity: any = (params: any) => {
    let entityTransformed: object[] = [];
  
    if (params && Array.isArray(params)) {
      params.forEach((order) => {
        entityTransformed.push(resEntity(order));
      });
      return entityTransformed;
    }
  
    return resEntity(params);
  };
  
  const resEntity = (order: any) => {
  
    const entity: any = {
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
  
  export { transformedEntity as resTransformer };
  