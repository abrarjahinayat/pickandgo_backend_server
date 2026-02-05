const couponModel = require("../model/coupon.model");

// Create Coupon
const createCouponControllers = async (req, res) => {
  try {
    let { code, minPrice, amout, description, expiryDate, usageLimit, isActive } = req.body;

    // Validate required fields
    if (!code || !minPrice || !amout) {
      return res.status(400).json({
        success: false,
        message: "Code, minimum price, and discount amount are required",
      });
    }

    // Check if coupon code already exists
    const existingCoupon = await couponModel.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const newCoupon = new couponModel({
      code: code.toUpperCase(),
      minPrice: Number(minPrice),
      amout: Number(amout),
      description: description || "",
      expiryDate: expiryDate || null,
      usageLimit: usageLimit || null,
      isActive: isActive !== undefined ? isActive : true,
    });

    await newCoupon.save();

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: newCoupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Get All Coupons
const getAllCouponsControllers = async (req, res) => {
  try {
    const coupons = await couponModel.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All coupons retrieved successfully",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Get Single Coupon by ID
const getCouponByIdControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await couponModel.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon retrieved successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Apply Coupon (Validate)
const applyCouponControllers = async (req, res) => {
  try {
    let { code, orderAmount } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    const coupon = await couponModel.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "This coupon is no longer active",
      });
    }

    // Check if coupon has expired
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "This coupon has expired",
      });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit has been reached",
      });
    }

    // Check minimum purchase amount
    if (orderAmount && orderAmount < coupon.minPrice) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase amount of ৳${coupon.minPrice} required`,
      });
    }

    // Calculate discount
    const discountAmount = Math.min(coupon.amout, orderAmount || Infinity);

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        coupon,
        discountAmount,
        finalAmount: orderAmount ? orderAmount - discountAmount : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Update Coupon
const updateCouponControllers = async (req, res) => {
  try {
    const { id } = req.params;
    let { code, minPrice, amout, description, expiryDate, usageLimit, isActive } = req.body;

    const coupon = await couponModel.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    // If code is being changed, check if new code already exists
    if (code && code.toUpperCase() !== coupon.code) {
      const existingCoupon = await couponModel.findOne({ code: code.toUpperCase() });
      if (existingCoupon) {
        return res.status(400).json({
          success: false,
          message: "Coupon code already exists",
        });
      }
    }

    // Update fields
    if (code) coupon.code = code.toUpperCase();
    if (minPrice !== undefined) coupon.minPrice = Number(minPrice);
    if (amout !== undefined) coupon.amout = Number(amout);
    if (description !== undefined) coupon.description = description;
    if (expiryDate !== undefined) coupon.expiryDate = expiryDate || null;
    if (usageLimit !== undefined) coupon.usageLimit = usageLimit || null;
    if (isActive !== undefined) coupon.isActive = isActive;

    await coupon.save();

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Delete Coupon
const deleteCouponControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await couponModel.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
      data: deletedCoupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// Toggle Coupon Status
const toggleCouponStatusControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await couponModel.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    return res.status(200).json({
      success: true,
      message: `Coupon ${coupon.isActive ? "activated" : "deactivated"} successfully`,
      data: coupon,
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
  createCouponControllers,
  getAllCouponsControllers,
  getCouponByIdControllers,
  applyCouponControllers,
  updateCouponControllers,
  deleteCouponControllers,
  toggleCouponStatusControllers,
};