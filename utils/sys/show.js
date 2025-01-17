const show = async (m) => {
    return new Promise((resolve) => {
        console.log(m);
        resolve();
    });
};

module.exports = show;
