const express = require("express");
const allRoutes = require("./routes/contactRoute");
const dbConnection = require("./db/dbConnection");
const errorHandler = require("./constant/errorHandler");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/contact", allRoutes);
// app.use(errorHandler);

// Database conntection
dbConnection();

// Server running on..
app.listen(PORT, () => {
  console.log(`Server started on: ${PORT} 🥳`);
});

// Database Conntection
// mongoose
//   .connect(
//     "mongodb+srv://admin:1234@cluster0.av4aw1o.mongodb.net/mernproject?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Database is connected..");
//   })
//   .catch((e) => {
//     console.log("Error =>", e);
//   });
