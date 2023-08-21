const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db has been connected");
  } catch (error) {
    console.log("error on connecting DB", error.message);
  }
};

module.exports = connectDB;
// 9CfgebszghVHM8FI
