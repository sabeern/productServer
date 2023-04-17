const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  addedUser: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model(process.env.PRODUCT_COLLECTION, productSchema);
