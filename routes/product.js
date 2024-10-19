const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/sub_category");
const productRouter = express.Router();

productRouter.post("/api/add-product", async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      categoryId,
      subCategoryId,
      images,
      popular,
      recommend,
    } = req.body;

    const category = await Category.findById(categoryId);
    const subCategory = await SubCategory.findById(subCategoryId);

    if (!category || !subCategory) {
      return res.status(400).json({ message: 'Invalid category or subcategory ID' });
    }

    const newProduct = new Product({
      productName,
      productPrice,
      quantity,
      description,
      categoryId,
      subCategoryId,
      images,
      popular,
      recommend,
    });

    await newProduct.save();

    res.status(201).json({ msg: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', error: error.message });
  }
});

productRouter.get("/api/products/:id?", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const product = await Product.findById(id).populate('categoryId').populate('subCategoryId');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    const products = await Product.find().populate('categoryId').populate('subCategoryId');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', error: error.message });
  }
});

module.exports = productRouter;
