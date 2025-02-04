import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../db";
import { Order } from "./Order";
import { Food } from "./food";

export const OrderFood = sequelize.define('order_food',{
    order_food_id : {
        type : INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    quantity : {
        type : DataTypes.INTEGER,
        defaultValue : 1
    },
    order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        references : {
            model : Order,
            key : 'order_id'
        }
    },
    food_id :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        references : {
            model : Food,
            key : 'food_id'
        }
    }
})