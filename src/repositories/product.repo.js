import prisma from "../config/db.js";

// ✅ Create Product with Images
export const createProduct = async (data) => {
  return await prisma.products.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category_id: data.category_id,
      product_images: {
        create: data.images.map((img) => ({
          image_url: img
        }))
      }
    },
    include: {
      product_images: true,
      categories: true
    }
  });
};


// ✅ Get Latest 8 Products
export const getLatestProducts = async () => {
  return await prisma.products.findMany({
    take: 8,
    orderBy: {
      created_at: "desc"
    },
    include: {
      product_images: true,
      categories: true
    }
  });
};