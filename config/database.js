const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akshavanth:9CfgebszghVHM8FI@mern-blog-v1.pjcghf8.mongodb.net/mern-blog?retryWrites=true&w=majority"
    );
    console.log("db has been connected");
  } catch (error) {
    console.log("error on connecting", error.message);
  }
};

module.exports = connectDB;
// 9CfgebszghVHM8FI
