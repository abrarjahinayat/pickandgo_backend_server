const express = require("express");
const path = require("path");

const upload = require("../../../utils/multer.img.upload");
const { 
  addcategoryControllers, 
  deletecategoryControllers, 
  getallcategoryControllers, 
  getallcategoryAdminControllers, // Add this
  updatecategoryControllers 
} = require("../../../controllers/categoryControllers");

const router = express.Router();

// Add Category Route
router.post("/addcategory", upload.single("category"), addcategoryControllers);

// Delete Category Route
router.delete("/deletecategory/:id", deletecategoryControllers);

// Update Category Route
router.put("/updatecategory/:id", upload.single("category"), updatecategoryControllers);

// Get All Category Route (Frontend - Only Active)
router.get("/getallcategory", getallcategoryControllers);

// Get All Category Route (Admin - All Categories) ✅ NEW
router.get("/getallcategoryadmin",  getallcategoryAdminControllers);

module.exports = router;