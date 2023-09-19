const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://admin:1234@cluster0.av4aw1o.mongodb.net/mernproject?retryWrites=true&w=majority"
    );
    console.log("Database is connected..", connect.connection.name);
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = dbConnection;
