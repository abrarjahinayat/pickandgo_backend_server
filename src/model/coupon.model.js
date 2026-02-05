const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    minPrice: {
      type: Number,
      required: [true, "Minimum price is required"],
      min: 0,
    },
    amout: {
      type: Number,
      required: [true, "Discount amount is required"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);