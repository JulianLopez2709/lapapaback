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
        await sequelize.sync({ force: false });
        await client.connect();
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}


export { connect ,sequelize};
