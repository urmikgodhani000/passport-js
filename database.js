const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://0.0.0.0:27017/passportJS", {});
  console.log(`MongoDB Connected ${conn.connection.host}`);
};
module.exports = connectDB;
