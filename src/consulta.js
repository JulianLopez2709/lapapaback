import { Food } from './models/Food.js';
import { Order } from './models/Order.js';

async function getOrders() {
    const result = await Food.findAll()
    return result
}

async function newFood(data) {
    try{
        const {name, price, description} = data
        const res = Food.create({
            name,
            price, 
            description
        })
        return res; 
    }catch(err){
        console.error("Error executing query:", err);
    }
}


async function newOrder(data) {
    try{
        const {user_id, order_status} = data
        const res = Order.create({
            
        })
        return res; 
    }catch(err){
        console.error("Error executing query:", err);
    }
}


async function getNote(id) {
    const res = await client.query('SELECT * FROM food WHERE id = $1', [id])
    return res.rows
}

async function updateFood(food) {
    const json = JSON.parse(food)
    const id = json.id
    const query = 'UPDATE food SET isprocess = false WHERE id = $1'
    const res = await client.query(query, [id])
    return res.rows
}

export {getOrders,newFood,newOrder,getNote,updateFood}
