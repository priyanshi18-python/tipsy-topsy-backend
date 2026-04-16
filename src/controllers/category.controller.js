import * as categoryService from "../services/category.service.js";

// ✅ BigInt Serializer Helper
// (same jo product.controller.js mein hai — BigInt ko String mein convert karta hai)
const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

// ✅ Add Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const category = await categoryService.createCategoryService(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: serializeBigInt(category)
    });

  } catch (err) {
    console.error(err);

    // Agar duplicate name diya toh Prisma P2002 error deta hai
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists"
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "Category creation failed"
    });
  }
};

// ✅ Get All Categories Controller
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategoriesService();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: serializeBigInt(categories)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching categories"
    });
  }
};