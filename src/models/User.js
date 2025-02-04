import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define('users', {
    user_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    first_name : {
        type : DataTypes.STRING
    },
    last_name : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    role : {
        type : DataTypes.STRING,
        defaultValue : 'customer'
    }
})

