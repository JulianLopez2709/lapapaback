import { Router } from "express";
import { create} from "../controllers/users.controller.js";

const routerUser = Router()

routerUser.post("", create)

export default routerUser;