"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resTransformer = void 0;
const transformedEntity = (params) => {
    let entityTransformed = [];
    if (params && Array.isArray(params)) {
        params.forEach((account) => {
            entityTransformed.push(resEntity(account));
        });
        return entityTransformed;
    }
    return resEntity(params);
};
exports.resTransformer = transformedEntity;
const resEntity = (account) => {
    const entity = {
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
//# sourceMappingURL=accounts.transformer.js.map