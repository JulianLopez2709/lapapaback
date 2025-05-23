import { Op, where } from "sequelize";
import { Food } from "../models/Food.js";
import { Order } from "../models/Order.js";
import { OrderFood } from "../models/OrderFood.js";

export const createOrderService = async ({ user_id, foods, table, total_price= 0}) => {
    try {
        //const totalPrice = foods.reduce((sum, food) => sum + food.price, 0)
        console.log("totalPrice", total_price)
        const newOrder = await Order.create({ user_id, total_price , table })

        const orderFoodData = foods.map((food) => ({
            order_id: newOrder.order_id,
            food_id: food.food_id,
            extras: food.extras,
            notes: food.notes
        }
        ))


        const createdOrderFoods = await OrderFood.bulkCreate(orderFoodData)
        return { data: newOrder }
    } catch (error) {
        throw error
    }
}

export const getOrderService = async () => {
    try {
        const now = new Date();

        // Ajustar para el inicio del día (2AM Colombia)
        const todayStart = new Date(now);
        todayStart.setHours(7, 0, 0, 0);
        
        // Si son menos de las 2AM, considerar que es parte del día anterior
        if (now.getHours() < 7) {
            todayStart.setDate(todayStart.getDate() - 1);
        }
        
        // Fin del día (1:59:59 AM del día siguiente)
        const endDate = new Date(todayStart);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(6, 59, 59, 999);
        
        // Ajustar a UTC para la consulta
        //const utcTodayStart = new Date(todayStart.getTime() - (5 * 60 * 60 * 1000));
        //const utcEndDate = new Date(endDate.getTime() - (5 * 60 * 60 * 1000));

        const ordersall = await Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [todayStart, endDate]
                }
            },
            include: [{
                model: OrderFood,
                attributes: ['extras', 'notes'],
                include: [Food]
            }],
            
        })

        return ordersall
    } catch (error) {
        throw error
    }
}


export const getOrdersDayService = async () => {
    try {
        const now = new Date();

        // Calcular el inicio y fin del día en la hora local
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        // Convertir a formato 'YYYY-MM-DD HH:mm:ss.SSS' sin zona horaria
        const formatDate = (date) => date.toISOString().slice(0, 23).replace("T", " ");

        const startOfDayStr = formatDate(startOfDay);
        const endOfDayStr = formatDate(endOfDay);

        const ordersday = await Order.findAll({
            include: [{
                model: OrderFood,
                attributes: ['id'],
                include: [{
                    model: Food,
                    attributes: ['name']
                }]
            }],
            where: {
                order_status: { [Op.not]: "preparing" },
                createdAt: {
                    [Op.between]: [startOfDayStr, endOfDayStr]
                }
            },
        });
        return ordersday
    } catch (error) {
        throw error
    }
}


export const patchStatusOrderService = async (orderId, status) => {
    try {

        const order = await Order.findByPk(orderId)

        if (!order) {
            return { status: 400, data: "order no found" }
        }

        order.order_status = status
        await order.save()

        return { status: 200, data: "Estado Actualizado" }
    } catch (error) {
        throw error
    }
}


export const addOrderService = async (id, newFood, total_price) => {
    try {
        const order = await Order.findOne({
            attributes: ["order_id", "total_price"],
            where: {
                order_id: id
            }
        })

        if (!order) {
            return { status: 400, data: "order no found" }
        }

        // Obtener los precios de los nuevos productos agregados
        const foodPrices = await Food.findAll({
            attributes: ["food_id", "price"],
            where: { food_id: newFood.map(food => food.food_id) }
        });

        // Mapear los precios de los alimentos agregados
        const foodPriceMap = foodPrices.reduce((acc, food) => {
            acc[food.food_id] = food.price;
            return acc;
        }, {});

        // Calcular el costo total de los nuevos productos
        const additionalPrice = newFood.reduce((sum, food) => {
            return sum + (foodPriceMap[food.food_id] || 0);
        }, 0);

        const orderFoodData = newFood.map((food) => ({
            order_id: order.order_id,
            food_id: food.food_id,
            extras: food.extras,
            notes: food.notes
        }
        ))

        await OrderFood.bulkCreate(orderFoodData)

        await Order.update(
            { total_price: order.total_price + additionalPrice },
            { where: { order_id: order.order_id } }
        );

        return { status: 200, data: `Se añadio productos a la order : ${order.order_id}` }

    } catch (error) {
        throw error
    }
}