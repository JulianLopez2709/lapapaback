import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export const Table = sequelize.define('tables', {
    table_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    table_number : {
        type: DataTypes.INTEGER,
    },
    seats:{
        type : DataTypes.INTEGER
    },
    status : {
        DataTypes : DataTypes.STRING,
        defaultValue : 'available'
    }
})