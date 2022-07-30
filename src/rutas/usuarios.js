const express=require('express');
const ruta=express.Router();
const db = require('../database');

ruta.get('/registro', async(req, res)=>{
       res.render('auth/registro')
});
ruta.post('/registro', async(req, res)=>{
    res.redirect('/paginas/principal');
}); 

 ruta.get('/inicio', async(req,res) => {
    console.log("Recorda usar esto para ver tus cosas")
    res.render('auth/inicio');
}); 
 ruta.post('/inicio', async(req, res)=>{

    console.log(req.body)
    res.redirect('/paginas/principal'); 
}); 
ruta.get('/principal', async (req, res)=> {
    res.render('paginas/principal');
});
/*ruta.post('/principal', async (req,res)=>{
    res.redirect('')
}); */

 ruta.get('/listadousuario', async (req, res)=> {
    const usuarios= await db.query ('select * from usuarios');
    console.log(usuarios)
    res.render('paginas/listadoUsuario', {usuarios});
}); 
/* ruta.post('/listadoUsuario', async (req, res)=> {
    res.redirect('recibido');
}); */


module.exports=ruta;