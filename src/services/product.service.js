import * as productRepo from "../repositories/product.repo.js";

export const createProductService = async (data) =>{
    if (!data.name || !data.price || !data.stock){
        throw new error("")
    }
}