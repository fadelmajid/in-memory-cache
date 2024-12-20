// Import utility functions for type detection and parsing
const { detectType, inputValue } = require("./utils");

class keyValueStore {
    constructor() {
        // Store key-value pairs
        this.store = new Map();
        // Track data types of attributes
        this.attributeTypes = new Map();
    }

    /**
     * Adds or updates a key with attributes in the key-value store.
     * Throws an error if a data type mismatch is detected.
     * @param {string} key - The key to add or update.
     * @param {Array} attributes - Array of attribute key-value pairs.
     */
    put(key, attributes) {
        const value = {};
        for (let i = 0; i < attributes.length; i += 2) {
            const attrKey = attributes[i];
            const attrValue = attributes[i + 1];

            // Check the existing type for this attribute
            const existingType = this.attributeTypes.get(attrKey);
            const valueType = detectType(attrValue);

            // If a type mismatch is found, throw an error
            if (existingType && existingType !== valueType) {
                throw new Error("Data Type Error");
            }

            // Store the detected type if not already present
            if (!existingType) {
                this.attributeTypes.set(attrKey, valueType);
            }

            // Parse and store the attribute value
            value[attrKey] = inputValue(attrValue, valueType);
        }

        // Add or update the key-value pair
        this.store.set(key, value);
        return this.store.get(key);
    }

    /**
     * Retrieves the value associated with a key.
     * @param {string} key - The key to retrieve.
     * @returns {Object|null} - The value object or null if not found.
     */
    get(key) {
        return this.store.get(key) || null;
    }

    /**
     * Deletes a key from the store.
     * @param {string} key - The key to delete.
     */
    delete(key) {
        this.store.delete(key);
    }

    /**
     * Searches for keys that have a specific attribute key-value pair.
     * @param {string} attrKey - The attribute key to search.
     * @param {string} attrValue - The attribute value to match.
     * @returns {Array} - Sorted list of keys matching the criteria.
     */
    search(attrKey, attrValue) {
        const result = [];
        for (const [key, value] of this.store.entries()) {
            // Match the attribute key-value pair
            if (
                value[attrKey] &&
                String(value[attrKey]) === String(attrValue)
            ) {
                result.push(key);
            }
        }
        return result.sort();
    }

    /**
     * Retrieves all keys in the store.
     * @returns {Array} - Sorted list of all keys.
     */
    keys() {
        return Array.from(this.store.keys()).sort();
    }
}

// Export the keyValueStore class for use in other modules
module.exports = keyValueStore;
