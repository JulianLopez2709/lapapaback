import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './sockets.js';
import { newFood,getFood } from './db.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ahora puedes usar __dirname
app.use(express.static(path.join(__dirname, 'public')));


app.get('/all', async(req,res)=>{
    try{
        const foods = await getFood()
        res.status(201).json(foods); 
    }catch(err){
        res.status(500).json({ error: err });
    }
})
/*
app.post("/newfood", async (req, res) => {
    console.log(req.body);
    const { title, description, price, img=null, isProcess=true } = req.body;
    try {
        const result = await newFood(title, description,price, img, isProcess);
        res.status(201).json(result); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message }); 
    }
})
*/

export default app;