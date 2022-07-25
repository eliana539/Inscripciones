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



module.exports=ruta;