import prisma from "../config/db.js";

export const createproduct =  async (data) => {
    return await prisma.products.create({
        data : {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category_id: data.category_id,
            product_image: {
                create : data.images.map((img) => ({
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