"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqBodyTransformer = void 0;
const removeEmptyProps = (body) => {
    let data = body;
    Object.keys(data).forEach((key) => {
        let value = data[key];
        // trim string type value
        if (typeof value == "string") {
            value = value.trim();
        }
        // check value is falsy or not equal zero, then delete the property
        if (!value && value !== 0 && value !== false && value !== "") {
            delete data[key];
        }
        // check value is object or not, If object then recursively call. (In JS null and array is object type)
        if (typeof value === "object" && value != null && !Array.isArray(value)) {
            removeEmptyProps(value);
        }
    });
    return data;
};
exports.reqBodyTransformer = removeEmptyProps;
//# sourceMappingURL=reqbodytransformer.js.map