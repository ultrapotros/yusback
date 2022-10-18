
const mongoose = require("mongoose");

const MONGO_URL =process.env.MONGODB;

const myClient = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = myClient