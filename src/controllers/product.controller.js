import * as productService from "../services/product.service.js";

// ✅ BigInt Serializer Helper
const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

// ✅ Add Product
export const createProductController = async (req, res) => {
  try {
    const product = await productService.createProductService(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: serializeBigInt(product)
    });

  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message || "Product creation failed"
    });
  }
};

// ✅ Get Latest 8 Products
export const getLatestProductsController = async (req, res) => {
  try {
    const products = await productService.getLatestProductsService();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: serializeBigInt(products)
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products"
    });
  }
};