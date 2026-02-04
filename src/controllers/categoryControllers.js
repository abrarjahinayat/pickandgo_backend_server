const categoryModel = require("../model/category.model");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

// Add Category Controller
const addcategoryControllers = async (req, res) => {
  try {
    let { filename } = req.file;
    let { name , isActive } = req.body;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addcategory = await new categoryModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      name,
      isActive,
      slug,
    });
    await addcategory.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: addcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Delete Category Controller
const deletecategoryControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let categorypath = path.join(__dirname, `../../uploads/`);
    let deletedCategory = await categoryModel.findByIdAndDelete({ _id: id });
    let imageurl = deletedCategory.image.split("/");
    fs.unlink(`${categorypath}/${imageurl[imageurl.length - 1]}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category id not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Update Category Controller
const updatecategoryControllers = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, isActive } = req.body;
    let filename = req.file?.filename;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    if (!name) {
      return res.status(404).json({
        success: false,
        message: "Please provide name to update",
      });
    }

    let findcategory = await categoryModel.findOne({ _id: id });
    
    if (!findcategory) {
      return res.status(404).json({ 
        success: false, 
        message: "Category not found" 
      });
    }

    // Update fields
    findcategory.name = name;
    findcategory.slug = slug;
    findcategory.isActive = isActive;

    // If new image is uploaded, delete old image and update
    if (filename) {
      let imageurl = findcategory.image.split("/");
      let filepath = path.join(__dirname, "../../uploads");
      fs.unlink(`${filepath}/${imageurl[imageurl.length - 1]}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      findcategory.image = `${process.env.SERVER_URL}/${filename}`;
    }

    await findcategory.save();
    
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: findcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Get All Category Controller (Frontend - Only Active)
const getallcategoryControllers = async (req, res) => {
  try {
    let allcategory = await categoryModel.find({ isActive: true }).populate({
      path: "subcategory",
      select: "name slug",
    });
    return res.status(200).json({
      success: true,
      message: "All active categories fetched successfully",
      data: allcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Get All Category Controller (Admin - Active + Inactive)
const getallcategoryAdminControllers = async (req, res) => {
  try {
    let allcategory = await categoryModel.find({}).populate({
      path: "subcategory",
      select: "name slug",
    });
    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

module.exports = {
  addcategoryControllers,
  deletecategoryControllers,
  getallcategoryControllers,
  getallcategoryAdminControllers,
  updatecategoryControllers,
};