import { createOrderService, getOrderService } from "../services/order.service.js";

export const getOrders = async(req,res)=>{
    try{
        const orders = await getOrderService()
        res.status(200).send({data: orders}); 
    }catch(err){
        res.status(500).send({ error: err });
    }
}

export const create = async(req, res)=>{
    const {user_id=1,foods} = req.body
    try {
        const created = await createOrderService({user_id,foods})
        console.log(await created)
        res.status(201).send({data: "CREADO"}); 
    } catch (error) {
        res.status(500)
    }
} 