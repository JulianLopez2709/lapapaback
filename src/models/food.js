import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Food = sequelize.define('food', {
    food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    type : {
        type : DataTypes.STRING
    }
})