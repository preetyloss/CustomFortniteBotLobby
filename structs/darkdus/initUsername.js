async function init(username) {
    try {
        const filePath = path.join(__dirname, "client", "config.json");

        fs.writeFile(filePath, JSON.stringify({ username }, null, 2), (err) => {
            if (err) {
                console.error(err);
            }
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = init;
