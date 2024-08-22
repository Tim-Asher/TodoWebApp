const mongoose = require("mongoose");

exports.connectDB = async (conStr) => {
  try {
    const con = await mongoose.connect(conStr);
    if (con) console.log(`The db is connected to ${con.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
