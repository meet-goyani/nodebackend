const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter name"],
  },
  email: {
    type: String,
    require: [true, "Please enter email"],
  },
  phone: {
    type: Number,
    require: [true, "Please enter phone"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
