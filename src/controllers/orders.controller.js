import { createOrderService, getOrderService, getOrdersDayService, patchStatusOrderService } from "../services/order.service.js";

export const getOrders = async(req,res)=>{
    try{
        const orders = await getOrderService()
        res.status(200).send(orders); 
    }catch(err){
        res.status(500).send({ error: err.message });
    }
}

export const create = async(req, res)=>{
    const {user_id=1,foods} = req.body
    try {
        const created = await createOrderService({user_id,foods})
        res.status(201).send(created); 
    } catch (error) {
        res.status(500)
    }
} 

export const getOrdersDay = async(req,res)=>{
    try {
        const orderday = await getOrdersDayService()
        res.status(200).send(orderday)
    } catch (error) {
        res.status(500)
    }
}

export const patchOrder = async(req, res)=>{
    const {status} = req.body
    const orderId = req.params.id
    try {
        if(!status){
            return res.status(400).send({error: "el estado es requerido"})
        }
        const result = await patchStatusOrderService(orderId, status)
        res.status(result.status).send(result.data)
    } catch (error) {
        res.status(500)
        
    }
}