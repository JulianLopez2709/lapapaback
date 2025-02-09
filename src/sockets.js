import { getOrders, newFood, getNote, updateFood, newOrder } from "./consulta.js";
import { createOrderService, getOrderService } from "./services/order.service.js";

export default (io) => {
    io.on("connection", async (socket) => {
        console.log("new user connected")

        const emitFood = async () => {
            const orders = await getOrderService()
            io.emit('server:loadfood', orders)
        }

        emitFood()

        socket.on('client:newfood', async (data) => {
            await newFood(data);
            emitFood()
        })

        socket.on('client:neworder', async (data) => {
            await createOrderService(data);
        })

        socket.on("client:deletefood", async (id)=>{
            await deleteFood(id)
            emitFood()
        })

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });


        socket.on('client:test', (e)=>{
            console.log(e)
            io.emit('server:test', e)
        })


        socket.on('client:getfood',async(e)=>{
            let food = await getNote(e)
            socket.emit('server:getfood', food)
        })

        socket.on('client:update', async (food)=>{
            await updateFood(food)
            emitFood()
        })
    })
}