/**
 * Detects the type of a given value.
 * @param {string} value - The value to detect.
 * @returns {string} - The detected type: 'integer', 'double', 'boolean', or 'string'.
 */
function detectType(value) {
    if (typeof value === "number" && !Number.isInteger(value)) return "double";
    if (Number.isInteger(value)) return "integer";
    if (value === "true" || value === "false") return "boolean";
    return "string";
}

/**
 * Parses a value into the appropriate data type.
 * @param {string} value - The value to parse.
 * @param {string} type - The type to parse the value as.
 * @returns {*} - The parsed value in its correct data type.
 */
function inputValue(value, type) {
    switch (type) {
        case "integer":
            return parseInt(value, 10);
        case "double":
            return parseFloat(value);
        case "boolean":
            return value === "true";
        default:
            return value;
    }
}

// Export utility functions for use in other modules
module.exports = { detectType, inputValue };
