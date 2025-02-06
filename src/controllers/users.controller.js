import { createUserService } from "../services/user.service.js";


export const create = async(req, res)=>{
    const {first_name,last_name, email, role} = req.body
    try {
        const created = await createUserService(first_name,last_name, email, role)
        res.status(201).send({data:created}); 
    } catch (error) {
        res.status(500).send({ error: err.message });
    }
} 