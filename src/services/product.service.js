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

  if (!Array.isArray(data.images) || data.images.length === 0) {
    throw new Error("At least one image is required");
  }

  const product = await productRepo.createProduct(data);

  return product;
};


// ✅ Get Latest Products Service
export const getLatestProductsService = async () => {
  return await productRepo.getLatestProducts();
};