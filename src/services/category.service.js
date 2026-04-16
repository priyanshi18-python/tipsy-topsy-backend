import * as categoryRepo from "../repositories/category.repo.js";

// ✅ Create Category Service
export const createCategoryService = async (data) => {
  // Validation — name toh dena hi padega
  if (!data.name) {
    throw new Error("Category name is required");
  }

  // Name mein sirf spaces nahi hone chahiye
  if (!data.name.trim()) {
    throw new Error("Category name cannot be empty");
  }

  return await categoryRepo.createCategory(data);
};

// ✅ Get All Categories Service
export const getAllCategoriesService = async () => {
  return await categoryRepo.getAllCategories();
};