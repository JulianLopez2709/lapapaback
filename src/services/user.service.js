import { User } from "../models/User.js";

export const createUserService = async(first_name,last_name, email, role)=>{
    try {
        const neUser = await User.create({first_name,last_name, email, role})
        return neUser
    } catch (error) {
        throw error
    }
}

