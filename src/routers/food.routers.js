import { Router } from "express";
import { createFood, getFoods } from "../controllers/food.controller.js";

const routerFood =  Router()

routerFood.get("/", getFoods)
routerFood.post("/", createFood)


export default routerFood;
