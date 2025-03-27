import pg from 'pg';
import './config.js'
import { Sequelize } from 'sequelize';


const sequelize  = new Sequelize(/*process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS*/ process.env.DATABASE_URL,{
    //host : process.env.DB_HOST,
    //port : process.env.DB_PORT || 5432,
    dialect : 'postgres',
    dialectModule : pg,
   
})

async function connect() {
    try {
        await sequelize.authenticate()
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err);
    }
}


export { connect ,sequelize};
