const mysql=require('mysql');
const{ promisify } = require('util');
const{database}=require('./keys');

const pool= mysql.createPool(database);
pool.getConnection((err, connection)=>{
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('conexion a base de datos fue cerrada');
        }
        if(err.code === 'ER_CON _COUNT_ERROR'){
            console.error ('cuantas conexiones tiene la base de datos');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('conexion a base de datos rechazada')
        }
    }
    if (connection) connection.release();
    console.log('excelente..!!! base de datos conectada');
    return;
});

pool.query = promisify (pool.query);
module.exports = pool;