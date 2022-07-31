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
    const usuarios = await db.query ('select legajo, nombre, apellido, dni from usuarios');
    res.render('paginas/listadoUsuario', {usuarios});
}); 
/* ruta.post('/listadoUsuario', async (req, res)=> {
    res.redirect('recibido');
}); */
 ruta.get('/informacionalumno/:legajo', async (req, res)=>{ 
    const{legajo} = req.params;
    const alumno = await db.query ('select usuarios.legajo, nombre, apellido, dni, domicilio, fechaNacimiento from usuarios where usuarios.legajo =?', [legajo]);
    const alumnoTel = await db.query ('select telefono from usuarios_tel where usuarios_tel.legajo =?',[legajo]);
    const alumnoEmail = await db.query ('select email from usuarios_mail where usuarios_mail.legajo =?', [legajo]);
    console.log(alumno)
    console.log(alumnoEmail)
    console.log(alumnoTel)
    res.render('paginas/informacionAlumno', {alumno,alumnoTel,alumnoEmail});
 });



module.exports=ruta;