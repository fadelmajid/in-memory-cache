const AsyncLock = require("async-lock");
const lock = new AsyncLock();
const keyValueStore = require("./keyValueStore");

const kvStore = new keyValueStore();

/**
 * Wrapper function to handle requests with a lock.
 * Ensures thread-safe operations on the key-value store.
 */
function handleRequestWithLock(command, args) {
    return new Promise((resolve, reject) => {
        lock.acquire("kvStoreLock", () => {
            try {
                let result;
                switch (command) {
                    case "put": {
                        const key = args[0];
                        const attributes = args.slice(1);
                        value = kvStore.put(key, attributes);
                        result = value
                        ? Object.entries(value)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")
                        : `No entry found for ${key}`;
                        break;
                    }
                    case "get": {
                        const key = args[0];
                        const value = kvStore.get(key);
                        result = value
                            ? Object.entries(value)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(", ")
                            : `No entry found for ${key}`;
                        break;
                    }
                    case "delete": {
                        const key = args[0];
                        kvStore.delete(key);
                        break;
                    }
                    case "search": {
                        const attrKey = args[0];
                        const attrValue = args[1];
                        result = kvStore.search(attrKey, attrValue).join(",");
                        break;
                    }
                    case "keys": {
                        result = kvStore.keys().join(",");
                        break;
                    }
                    default:
                        reject("Invalid command");
                }
                resolve(result);
            } catch (error) {
                reject(error.message);
            }
        });
    });
}

module.exports = handleRequestWithLock;
