/**
 * Filter a given object
 * @param {object} obj object to filter
 * @param {function} predicate function to filter. Receives a branch which should be evaluated to a boolean value.
 * If it returns "true"  the value is considered, if returns "false" the value is discarded.
 * @returns {object} the filtered object
 */
export const clientSideFilter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
