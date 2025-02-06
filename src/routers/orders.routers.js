import { Router } from "express";
import { create, getOrders} from "../controllers/orders.controller.js";

const routerOrder = Router()

routerOrder.get("", getOrders)
routerOrder.post("", create)

export default routerOrder;
