const express = require("express");
const path = require("path");

const upload = require("../../../utils/multer.img.upload");
const {
  addproductCollectionBanner,
  updateproductCollectionBanner,
  deleteproductCollectionBanner,
  getAllproductCollectionBanners,
  getdesignerpoloBanner,
  getkurtitopsBanner,
  getpanjabiBanner,
  getcargodenimsBanner,
  getlittleonesteesBanner,
  getpremiumsockesBanner,
  getwomenproductsBanner,
} = require("../../../controllers/productCollectionBannerControllers");

const router = express.Router();

// Add Product Collection Banner Route
router.post("/addproductCollectionBanner", upload.single("productbanner"), addproductCollectionBanner);

// Update Product Collection Banner Route
router.patch("/updateproductcollectionbanner/:id", upload.single("productbanner"), updateproductCollectionBanner);

// Delete Product Collection Banner Route
router.delete("/deleteproductcollectionbanner/:id", deleteproductCollectionBanner);

// Get All Product Collection Banners Route
router.get("/getallproductcollectionbanners", getAllproductCollectionBanners);

// Get designer polo banner route
router.get("/getdesignerpolobanner", getdesignerpoloBanner);

// Get kurtiTops banner route
router.get("/getkurtitopsbanner", getkurtitopsBanner);

// Get panjabi banner route
router.get("/getpanjabibanner", getpanjabiBanner);

// Get Cargo Denims Banner Route
router.get("/getcargodenimsbanner", getcargodenimsBanner);

// Little Ones Tees
router.get("/getlittleonesteesbanner", getlittleonesteesBanner);

// Premium Sockes
router.get("/getpremiumsockesbanner", getpremiumsockesBanner);

// Women products banner route
router.get("/getwomenproductsbanner", getwomenproductsBanner);

module.exports = router;