import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import routerOrder from './routers/orders.routers.js';
import routerFood from './routers/food.routers.js';
import routerUser from './routers/user.routers.js';

const app = express();
app.use(express.json());
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ahora puedes usar __dirname
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/order", routerOrder)
app.use("/food", routerFood)
app.use("/user", routerUser)

export default app;