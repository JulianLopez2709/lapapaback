import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../db.js";
import { Order } from "./Order.js";
import { Food } from "./Food.js";

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
    extras: {
        type : DataTypes.JSON,
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



// Relación muchos a muchos con Food
Order.belongsToMany(Food, { through: OrderFood, foreignKey: 'order_id' });
Food.belongsToMany(Order, { through: OrderFood, foreignKey: 'food_id' });
