import { Op } from "sequelize";
import { Food } from "../models/Food.js";
import { Order } from "../models/Order.js";
import { OrderFood } from "../models/OrderFood.js";

export const createOrderService = async ({ user_id, foods }) => {
    try {
        let total_price = 0;

        const foodPrices = await Promise.all(
            foods.map(async (item) => {
                const food = await Food.findOne({
                    where: { food_id: item.food_id },
                    attributes: ['price']
                });

                return food ? food.price : 0;
            })
        );

        total_price = foodPrices.reduce((sum, price) => sum + price, 0);

        const newOrder = await Order.create({ user_id, total_price })

        const orderFoodData = foods.map((food) => ({
            order_id: newOrder.order_id,
            food_id: food.food_id,
            extras: food.extras
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
        const ordersall = await Order.findAll({
            where: {
                order_status: "preparing",
            },
            include: [{
                model: OrderFood,
                attributes: ['extras'],
                include: [{
                    model: Food,
                }]
            }
            ]
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