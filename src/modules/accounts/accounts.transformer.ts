const transformedEntity: any = (params: any) => {
  let entityTransformed: object[] = [];

  if (params && Array.isArray(params)) {
    params.forEach((account) => {
      entityTransformed.push(resEntity(account));
    });
    return entityTransformed;
  }

  return resEntity(params);
};

const resEntity = (account: any) => {
  const entity: any = {
    _id: account._id,
    hensInfo: account.hensInfo,
    farmerInfo: account.farmerInfo,
    audit_trails: account.audit_trails,
    expenses: account.expenses,
    incomes: account.incomes,
    totalExpense: account.totalExpense,
    totalIncome: account.totalIncome,
    netBalance: account.netBalance,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };

  return entity;
};

export { transformedEntity as resTransformer };
