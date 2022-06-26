const express=require('express');
const ruta=express.Router();



ruta.get('/',(req,res)=>{
    res.redirect('/usuarios/registro');
});
module.exports=ruta;