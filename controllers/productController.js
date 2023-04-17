const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  let userId = req.userId;
  userId = new mongoose.Types.ObjectId(userId);
  const { productPrice, productName } = req.body;
  try {
    const newProduct = new productModel({
      productName,
      productPrice,
      addedUser: userId,
    });
    await newProduct.save();
    res.status(200).send({ msg: "Product added" });
  } catch (err) {
    res.status(500).send({ errMsg: "Product adding failed" });
  }
};
const getProduct = async (req, res) => {
  let userId = req.userId;
  userId = new mongoose.Types.ObjectId(userId);
  try {
    const products = await productModel.find({ addedUser: userId });
    res.status(200).send({ products });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "deleted" });
  } catch (err) {
    res.status(500).send({ errMsg: "Operation failed" });
  }
};

module.exports = { addProduct, getProduct, deleteProduct };
