import * as productRepo from "../repositories/product.repo.js";

export const createProductService = async (data) =>{
    if (!data.name || !data.price || !data.stock){
        throw new Error("required field missing");


    }

    if(data.price <= 0){
        throw new Error("price must be greater than 0");

    }

    if(data.stock < 0){
        throw new Error("stock can not be negative");
    }

    if (!Array.isArray(data.images) || data.images.length === 0){
        throw new Error("atleast one image is required");
    }

    const product = await productRepo.createproduct(data);
    return product;
}