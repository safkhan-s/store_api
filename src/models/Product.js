const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "you must provide name for product"],
  },
  price: {
    type: Number,
    required: [true, "you must provide price for product"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "Value is not supported",
    },
    required: [true, "you must prove company for product"],
  },
});

module.exports = mongoose.model("Product", productSchema);
