const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  const { name, company, featured, sort, field, numericFilters } = req.query;
  // SECTION: this section adds search query function to fet all product end point
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  // !SECTION
  // SECTION: this section sets numeric filters for query search and converts user friendly operators to mongodb oprators for numbers
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  // !SECTION
  // SECTION: this section adds sort function for getting all products
  let result = Product.find(queryObject);
  if (sort) {
    const sortedList = sort.split(",").join(" ");
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }
  // !SECTION
  // SECTION: this section adds select fields query function to fet all product end point
  if (field) {
    const fieldsList = field.split(",").join(" ");
    result = result.select(fieldsList);
  }
  // !SECTION
  // SECTION: this section setups pagination for  queries getting from db
  const page = Number(req.query.page) || 1;
  const limit = Number(req.querylimit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  // !SECTION

  console.log(queryObject);
  const allProducts = await result;
  res
    .status(200)
    .json({ status: "success", nbHits: allProducts.length, data: allProducts });
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
