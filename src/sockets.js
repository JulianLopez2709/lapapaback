import { getOrders, newFood, getNote, updateFood, newOrder } from "./consulta.js";
import { createOrderService, getOrderService, patchStatusOrderService } from "./services/order.service.js";

export default (io) => {
    io.on("connection", async (socket) => {
        console.log("new user connected")

        const emitOrder = async () => {
            const orders = await getOrderService()
            io.emit('server:loadOrder', orders)
        }

        emitOrder()

        socket.on('client:newOrder', async ({ user_id, foods }) => {
            await createOrderService({ user_id, foods });
            emitOrder()
        })

        socket.on("client:patchStatus", async (data)=>{
            await patchStatusOrderService(data.orderId, data.status)
            emitOrder()
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

    })
}