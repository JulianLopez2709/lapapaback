import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Food } from "./food.js";
import { OrderFood } from "./OrderFood.js";

export const Order = sequelize.define('orders',{
    order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id: {
        type : DataTypes.INTEGER,
    },
    order_status : {
        type : DataTypes.STRING
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
})

// Relaciones con User
User.hasMany(Order, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
});
Order.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'user_id'
});

// Relación muchos a muchos con Food
Order.belongsToMany(Food, { through: OrderFood, foreignKey: 'order_id' });
Food.belongsToMany(Order, { through: OrderFood, foreignKey: 'food_id' });