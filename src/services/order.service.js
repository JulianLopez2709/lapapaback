import { Order } from "../models/Order.js";
import { OrderFood } from "../models/OrderFood.js";

export const createOrderService = async({user_id,foods})=>{
    try {
        console.log(user_id, foods)
        const newOrder = await Order.create({user_id})
        const orderFoodData = foods.map((food)=>({
            order_id: newOrder.order_id,
            food_id : food.food_id,
            quantity : food.quantity,
            extras : food.extras
        }))
        
        console.log(orderFoodData)
        await OrderFood.bulkCreate(orderFoodData)
        return newOrder
    } catch (error) {
        throw error
    }
}

export const getOrderService = async()=>{
    try {
        const orders = await Order.findAll({
            where : {
                order_status : "preparing"
            }
        })
        const food = orders.map( async (order)=>{
            await OrderFood.findAll({
                where : {
                    order_id : order.order_id
                }
            })
        })

        const res = {foods : food}
        
        return res
    } catch (error) {
        throw error
    }
}