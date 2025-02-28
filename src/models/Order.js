import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";


export const Order = sequelize.define('orders',{
    order_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id: {
        type : DataTypes.INTEGER,
    },
    table : {
        type : DataTypes.INTEGER,
        defaultValue: 1
    },
    order_status : {
        type : DataTypes.STRING,
        defaultValue : "preparing"
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

