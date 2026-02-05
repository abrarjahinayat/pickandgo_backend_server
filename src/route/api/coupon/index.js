const express = require("express");
const {
  createCouponControllers,
  getAllCouponsControllers,
  getCouponByIdControllers,
  applyCouponControllers,
  updateCouponControllers,
  deleteCouponControllers,
  toggleCouponStatusControllers,
} = require("../../../controllers/couponControllers");

const router = express.Router();

// Create Coupon
router.post("/createCoupon", createCouponControllers);

// Get All Coupons
router.get("/allcoupon", getAllCouponsControllers);

// Get Single Coupon by ID
router.get("/coupon/:id", getCouponByIdControllers);

// Apply/Validate Coupon
router.post("/applyCoupons", applyCouponControllers);

// Update Coupon
router.put("/updatecoupon/:id", updateCouponControllers);

// Delete Coupon
router.delete("/deletecoupon/:id", deleteCouponControllers);

// Toggle Coupon Status (Active/Inactive)
router.patch("/togglestatus/:id", toggleCouponStatusControllers);

module.exports = router;