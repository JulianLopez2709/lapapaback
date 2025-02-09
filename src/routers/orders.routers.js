import { Router } from "express";
import { create, getOrders, getOrdersDay, patchOrder} from "../controllers/orders.controller.js";

const routerOrder = Router()

routerOrder.get("", getOrders)
routerOrder.post("", create)
routerOrder.get("/day", getOrdersDay)
routerOrder.patch("/:id", patchOrder)

export default routerOrder;
