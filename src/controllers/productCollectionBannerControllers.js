const productsCollectionBanner = require("../model/products.collection.banner");

const addproductCollectionBanner = async (req, res) => {
  try {
    let { filename } = req.file;
    let { link, title, category, isActive } = req.body;
    let productCollectionBanner = await new productsCollectionBanner({
      image: `${process.env.SERVER_URL}/${filename}`,
      link: `${process.env.FEATURE_PRODUCT_URL}/${link}`,
      title,
      category,
      isActive,
    });
    await productCollectionBanner.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "ProductCollectionBanner added successfully",
        data: productCollectionBanner,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Server Error",
        error: error.message || error,
      });
  }
};

// UPDATE Product Collection Banner
const updateproductCollectionBanner = async (req, res) => {
  try {
    const { id } = req.params;
    let { link, title, category, isActive } = req.body;
    
    // Prepare update data
    let updateData = {
      title,
      category,
      isActive,
    };

    // If a new file is uploaded, update the image
    if (req.file) {
      updateData.image = `${process.env.SERVER_URL}/${req.file.filename}`;
    }

    // If link is provided, update it
    if (link) {
      updateData.link = `${process.env.FEATURE_PRODUCT_URL}/${link}`;
    }

    const updatedBanner = await productsCollectionBanner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ProductCollectionBanner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// DELETE Product Collection Banner
const deleteproductCollectionBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBanner = await productsCollectionBanner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ProductCollectionBanner deleted successfully",
      data: deletedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

// GET ALL Product Collection Banners
const getAllproductCollectionBanners = async (req, res) => {
  try {
    const banners = await productsCollectionBanner.find({}).populate("category").sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Product Collection Banners",
      data: banners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getdesignerpoloBanner = async (req, res) => {
  try {
    let designerpoloBanner = await productsCollectionBanner.find({ title: "Designer Polo" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Designer Polo Banner",
      data: designerpoloBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getkurtitopsBanner = async (req, res) => {
  try {
    let kurtitopsBanner = await productsCollectionBanner.find({ title: "Kurti Tunic And Tops" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Kurti Tops Banner get successfully",
      data: kurtitopsBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getpanjabiBanner = async (req, res) => {
  try {
    let panjabiBanner = await productsCollectionBanner.find({ title: "Panjabi" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Panjabi Banner get successfully",
      data: panjabiBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getcargodenimsBanner = async (req, res) => {
  try {
    let cargodenimsBanner = await productsCollectionBanner.find({ title: "Cargo Denims" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Cargo Denims Banner get successfully",
      data: cargodenimsBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getlittleonesteesBanner = async (req, res) => {
  try {
    let littleonesteesBanner = await productsCollectionBanner.find({ title: "Little Ones Tees" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Little Ones Tees Banner get successfully",
      data: littleonesteesBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getpremiumsockesBanner = async (req, res) => {
  try {
    let premiumsockesBanner = await productsCollectionBanner.find({ title: "Premium Sockes" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Premium Sockes Banner get successfully",
      data: premiumsockesBanner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || error,
    });
  }
};

const getwomenproductsBanner = async (req, res) => {
  try {
    let womenproductsBanner = await productsCollectionBanner.find({ title: "Women Products" }).populate("category");
    return res.status(200).json({
      success: true,
      message: "Women Products Banner get successfully",
      data: womenproductsBanner,
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
};