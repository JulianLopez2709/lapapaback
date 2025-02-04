import pg from 'pg';
const { Client } = pg;
import './config.js'
import { Sequelize } from 'sequelize';


const sequelize  = new Sequelize('la_papa_db','postgres','postgres',{
    host : 'localhost',
    dialect : 'postgres'
})

// Configura tus datos de conexión
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

async function connect() {
    try {
        await client.connect();
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}

async function getFood() {
    const result = await client.query('SELECT * FROM food');
    return result.rows
}

async function newFood(data) {
    try{
        const json = JSON.parse(data)
        const query = `
            INSERT INTO food (title, description, price, isprocess, "table", duration) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`;
        const values = [json.title, json.description, json.price, json.isprocess, json.table, json.duration];
        const result = await client.query(query, values);
        return result.rows; 
    }catch(err){
        console.error("Error executing query:", err);
    }
}

async function deleteFood(id) {
    const query = `
        DELETE FROM food 
        WHERE id = $1
        RETURNING *;`; // Esto devolverá el registro eliminado, si lo deseas

    const values = [id];

    const result = await client.query(query, values);
    return result.rows;
}

async function getNote(id) {
    const res = await client.query('SELECT * FROM food WHERE id = $1', [id])
    return res.rows
}

async function updateFood(food) {
    const json = JSON.parse(food)
    const id = json.id
    const query = 'UPDATE food SET isprocess = false WHERE id = $1'
    const res = await client.query(query, [id])
    return res.rows
}


export { client, connect, getFood, newFood, deleteFood, getNote, updateFood, sequelize };
