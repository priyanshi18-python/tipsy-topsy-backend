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

// ✅ Update Product
export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await productService.updateProductService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: serializeBigInt(updated)
    });

  } catch (err) {
    console.error(err);
    const statusCode = err.message === "Product not found" ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Product update failed"
    });
  }
};

// ✅ Delete Product
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProductService(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (err) {
    console.error(err);
    const statusCode = err.message === "Product not found" ? 404 : 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Product deletion failed"
    });
  }
};