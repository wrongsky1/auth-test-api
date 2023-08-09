require("dotenv").config();

module.exports = {
    URL_DB:
        process.env.NODE_ENV !== "production"
            ? "mongodb://127.0.0.1:27017/test"
            : process.env.URL_DB,
};
