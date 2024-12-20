const handleRequestWithLock = require("./requesHandler");

async function simulateRequests() {
    const commands = [
        ["put", ["book", "title", "title", "episode", 12, "price", 10.0, "availability", true]],
        ["put", ["book", "title", "one piece", "episode", 12, "price", 15.0, "availability", false]],
        ["put", ["book2", "title", "hunter x hunter", "episode", 12, "price", 20.0, "availability", true]],
        ["get", ["book"]],
        ["search", ["title", "title"]],
        ["delete", ["book"]],
        ["keys", []],
    ];

    const promises = commands.map(([command, args]) =>
        handleRequestWithLock(command, args).then((res) =>
            console.log(`Command: ${command}, Result: ${res}`)
        )
    );

    await Promise.all(promises);
}

simulateRequests();
