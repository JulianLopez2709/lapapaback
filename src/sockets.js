import { createOrderService, getOrderService, patchStatusOrderService, addOrderService } from "./services/order.service.js";

export default (io) => {
    io.on("connection", async (socket) => {
        console.log("new user connected")

        const emitOrder = async () => {
            const orders = await getOrderService()
            io.emit('server:loadOrder', orders)
        }

        emitOrder()

        socket.on('client:newOrder', async (data) => {
            const parsedData = typeof data === "string" ? JSON.parse(data) : data;
            const user_id= parsedData.user_id
            const foods = parsedData.foods
            const table = parsedData.table
            const total_price = parsedData.total_price
            await createOrderService({ user_id, foods, table,total_price });
            emitOrder()
        })  

        socket.on("client:patchStatus", async (data) => {
            const parsedData = typeof data === "string" ? JSON.parse(data) : data;
            await patchStatusOrderService(parsedData.orderId, parsedData.status)
            emitOrder()
        })


        socket.on("client:addOrder", async (data) => {
            const parsedData = typeof data === "string" ? JSON.parse(data) : data;
            await addOrderService(parsedData.order_id, parsedData.foods, parsedData.total_price = 0)
            emitOrder()
        })

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });


        socket.on('client:test', (e) => {
            console.log(e)
            io.emit('server:test', e)
        })

    })
}