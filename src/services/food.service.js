import { Food } from "../models/Food.js";

export const getFoodsService = async()=>{
    try {
        const foods = await Food.findAll()
        return foods
    } catch (error) {
        throw error
    }
}

export const createService =async(name, description,type, price)=>{
    try {
        const createFood = await Food.create({
            name,
            description,
            type,
            price
        })
        return createFood;
    } catch (error) {
        throw error
    }
   
}