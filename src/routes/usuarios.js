const express=require('express');
const ruta=express.Router();
const pool = require('../database');

ruta.get('/registro', (req,res) => {
    console.log("Recorda usar esto para ver tus cosas")
    res.render('paginas/registro');
});
 /*    ruta.get('/ingreso', async(req, res)=>{
       res.render('paginas/ingreso')
    }) */
ruta.post('/registro', (req, res)=>{
    res.send('recibido'); 
});

module.exports=ruta;