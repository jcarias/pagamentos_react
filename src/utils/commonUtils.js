/**
 * Filter a given object
 * @param {object} obj object to filter
 * @param {function} predicate function to filter. Receives a branch which should be evaluated to a boolean value.
 * If it returns "true"  the value is considered, if returns "false" the value is discarded.
 * @returns {object} the filtered object
 */
export const clientSideFilter = (obj, predicate) => {
    if (!obj) {
        return obj;
    }
    return Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
};

/**
 * Tests if the value is empty.
 * @param {*} value
 * @returns {Boolean} **true** if the `value` is null or undefined, or if `value` is an empty object or array. **false** otherwise.
 */
export const isEmpty = value => {
    if (value === null || value === undefined) {
        return true;
    }

    if (value.constructor === Object) {
        return Object.keys(value).length === 0;
    }

    if (!Array.isArray(value) || !value.length) {
        return true;
    }

    return false;
};

export const isNotEmpty = value => {
    return !isEmpty(value);
};
