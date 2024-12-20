const readline = require("readline");
const AsyncLock = require("async-lock");
const lock = new AsyncLock();
const KeyValueStore = require("./keyValueStore");
const handleRequestWithLock = require("./requesHandler");

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const kvStore = new KeyValueStore();
console.log("Enter commands (type 'exit' to quit):");

// Handle user input
r.on("line", async (input) => {
    const args = input.trim().split(" ");
    const command = args[0];
    const params = args.slice(1);

    if (command === "exit") {
        r.close();
        return;
    }

    try {
        const result = await handleRequestWithLock(command, params);
        if (result !== undefined) {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
});

