const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  const allProducts = await Product.find({});
  res
    .status(200)
    .json({ status: "success", nHit: allProducts.length, data: allProducts });
};

const getProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findById({ _id: productId });
  if (!product) {
    throw new Error(`there is no product with id:${productId}`);
  }
  res.status(200).json({ status: "success", data: product });
};

const deleteProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete({ _id: productId });
  if (!product) {
    throw new Error(`there is no product with id:${productId}`);
  }
  res.status(200).json({ status: "success", data: product });
};

const updateProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const productUpdate = req.body;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    productUpdate,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new Error(`there is no product with id:${productId}`);
  }
  res.status(200).json({ status: "success", data: product });
};

const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ status: "success", data: product });
};

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
