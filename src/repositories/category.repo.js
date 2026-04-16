import prisma from "../config/db.js";

// ✅ Create Category
export const createCategory = async (data) => {
  return await prisma.categories.create({
    data: {
      name: data.name,          // Required - category ka naam
      description: data.description  // Optional - category ki description
    },
    include: {
      products: true  // is category ke products bhi saath aayenge
    }
  });
};

// ✅ Get All Categories
export const getAllCategories = async () => {
  return await prisma.categories.findMany({
    include: {
      products: true  // har category ke saath uske products bhi aayenge
    }
  });
};