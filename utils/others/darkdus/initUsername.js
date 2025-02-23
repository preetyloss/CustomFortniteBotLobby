const path = require("path");
const fs = require("fs").promises;

async function init(username) {
    try {
        const filePath = path.join(__dirname, "..", "..", "..", "client", "config.json");

        let data = {};
        try {
            const fileContent = await fs.readFile(filePath, "utf-8");
            data = JSON.parse(fileContent);
        } catch (err) {
            console.warn(err);
        }

        data.username = username;
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

module.exports = init;
