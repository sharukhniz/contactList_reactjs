const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("contact", contactSchema);
module.exports = collection;
