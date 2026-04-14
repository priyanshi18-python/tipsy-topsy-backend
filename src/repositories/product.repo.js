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

// ✅ Update Product with Images
export const updateProduct = async (id, data) => {
  // Pehle check karo product exist karta hai ya nahi
  const existing = await prisma.products.findUnique({
    where: { id: BigInt(id) }
  });

  if (!existing) return null;

  // Agar naye images diye hain toh purane delete karke naye add karo
  if (data.images && data.images.length > 0) {
    await prisma.product_images.deleteMany({
      where: { product_id: BigInt(id) }
    });
  }

  return await prisma.products.update({
    where: { id: BigInt(id) },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.price && { price: data.price }),
      ...(data.stock !== undefined && { stock: data.stock }),
      ...(data.category_id && { category_id: data.category_id }),
      ...(data.images && data.images.length > 0 && {
        product_images: {
          create: data.images.map((img) => ({
            image_url: img
          }))
        }
      })
    },
    include: {
      product_images: true,
      categories: true
    }
  });
};

// ✅ Delete Product (images bhi automatically delete hongi cascade se)
export const deleteProduct = async (id) => {
  const existing = await prisma.products.findUnique({
    where: { id: BigInt(id) }
  });

  if (!existing) return null;

  // Pehle related images delete karo
  await prisma.product_images.deleteMany({
    where: { product_id: BigInt(id) }
  });

  return await prisma.products.delete({
    where: { id: BigInt(id) }
  });
};