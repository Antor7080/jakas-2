"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOption = void 0;
const filterOption = (options) => {
    const { query } = options;
    // Create a new object to avoid mutating the original object
    const filters = Object.assign({}, query);
    // Exclude certain fields from the filters object
    const excludeFields = ['sort', 'page', 'limit', 'fields', 'startDate', 'endDate'];
    excludeFields.forEach((field) => delete filters[field]);
    // Use a library like `mongodb` or `mongoose` to parse filters
    const parsedFilters = JSON.parse(JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));
    // Use type annotations for the queries object
    const queries = {};
    if (query.sort) {
        // Use a more descriptive variable name
        const sortBy = query.sort.split(',').join(' ');
        queries.sortBy = sortBy;
    }
    if (query.fields) {
        // Use a more descriptive variable name
        const fields = query.fields.split(',').join(' ');
        queries.fields = fields;
    }
    if (query.page) {
        // Use destructuring to extract the `page` and `limit` properties
        const { page = 1, limit = 10 } = query;
        // Use type annotations for `skip` and `limit`
        const skip = (parseInt(page) - 1) * parseInt(limit, 10);
        queries.skip = skip;
        queries.limit = parseInt(limit, 10);
    }
    if (query.startDate) {
        queries.startDate = query.startDate;
    }
    if (query.endDate) {
        queries.endDate = query.endDate;
    }
    return { queries, filters: parsedFilters };
};
exports.filterOption = filterOption;
//# sourceMappingURL=filterOption.js.map