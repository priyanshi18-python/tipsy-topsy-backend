import * as productRepo from "../repositories/product.repo.js";

// ✅ Create Product Service
export const createProductService = async (data) => {
  if (!data.name || !data.price || !data.stock) {
    throw new Error("Required fields missing");
  }

  if (data.price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  if (data.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  return await productRepo.createProduct(data);
};

// ✅ Get Latest Products Service
export const getLatestProductsService = async () => {
  return await productRepo.getLatestProducts();
};

// ✅ Update Product Service
export const updateProductService = async (id, data) => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  if (data.price !== undefined && data.price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error("Stock cannot be negative");
  }

  const updated = await productRepo.updateProduct(id, data);

  if (!updated) {
    throw new Error("Product not found");
  }

  return updated;
};

// ✅ Delete Product Service
export const deleteProductService = async (id) => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const deleted = await productRepo.deleteProduct(id);

  if (!deleted) {
    throw new Error("Product not found");
  }

  return deleted;
};