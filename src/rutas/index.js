const express=require('express');
const ruta=express.Router();



ruta.get('/',(req,res)=>{
    res.redirect('/inicio');
});
module.exports=ruta;