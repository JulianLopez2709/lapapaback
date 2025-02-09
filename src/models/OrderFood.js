import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../db.js";
import { Order } from "./Order.js";
import { Food } from "./Food.js";

export const OrderFood = sequelize.define('order_food', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
    extras: {
        type: DataTypes.JSON,
    },
    food_id: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false,
})



// Una Orden tiene muchos registros en OrderFood
Order.hasMany(OrderFood, { foreignKey: 'order_id' });

// Un registro en OrderFood pertenece a una Orden
OrderFood.belongsTo(Order, { foreignKey: 'order_id' });

// Un Plato tiene muchos registros en OrderFood
Food.hasMany(OrderFood, { foreignKey: 'food_id' });

// Un registro en OrderFood pertenece a un Plato
OrderFood.belongsTo(Food, { foreignKey: 'food_id' });
