const express = require("express");
const path = require("path");

const { addbannerControllers, deletebannerControllers, updatebannerControllers, getallbannerControllers} = require("../../../controllers/bannerControllers");

const upload = require("../../../utils/multer.img.upload");
const bannerModel = require("../../../model/banner.model");

const router = express.Router();




// Add Banner Route
router.post("/addbanner",  upload.single("banner"), addbannerControllers);

// Delete Banner Route
router.delete("/deletebanner/:id",  deletebannerControllers); 

// Update Banner Route

router.patch("/updatebanner/:id",  upload.single("banner"), updatebannerControllers )

// Get All Banner Route
router.get("/getallbanner", getallbannerControllers );

module.exports = router;
