const express=require('express');
const ruta=express.Router();
const db = require('../database');

/*  ruta.get('/registro', async(req,res) => {
    console.log("Recorda usar esto para ver tus cosas")
    res.render('auth/registro');
}); */
 /*    ruta.get('/ingreso', async(req, res)=>{
       res.render('paginas/ingreso')
    }) */
/* ruta.post('/registro', async(req, res)=>{

    console.log(req.body)
    res.redirect('/usuarios/principal'); 
});  */
ruta.get('/principal', async (req, res)=> {
    res.render('paginas/principal');
});



module.exports=ruta;