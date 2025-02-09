import { createService, getFoodsService } from "../services/food.service.js"

export const getFoods = async(req,res)=>{
    try {
        const foods = await getFoodsService();
        res.status(200).send(foods)
    } catch (error) {
        res.status(500)
    }
}

export const createFood = async (req,res)=>{
    const {name,description,type, price} = req.body
    try {
        const createFood = await createService(name,description,type,price)
        res.status(200).send({data:createFood})
    } catch (error) {
        res.status(500)
    }
}