import pg from 'pg';
import './config.js'
import { Sequelize } from 'sequelize';


const sequelize  = new Sequelize('la_papa_db','postgres','postgres',{
    host : 'localhost',
    dialect : 'postgres'
})

async function connect() {
    try {
        await sequelize.sync({ force: false });
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}


export { connect ,sequelize};
