const express = require("express");
const SubCategory = require("../models/sub_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/subcategories", async (req, res) => {
  try {
    const { categoryId, categoryName, subCategoryName, image } = req.body;
    const subCategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategoryName,
    });
    await subCategory.save();
    return res.status(201).send(subCategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


subCategoryRouter.get("/api/category/:categoryId/subcategories", async (req, res) => {
  try {
   const {categoryId}=req.params;
    const subCategories = await SubCategory.find({categoryId:categoryId});
    if(!subCategories||subCategories.length==0){
      return res.status(404).json({msg:"No Subcategories Found"});
    }
    return res.status(200).send(subCategories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports=subCategoryRouter;