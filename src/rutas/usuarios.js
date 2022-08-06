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
ruta.get('/editaralumno/:legajo', async (req, res)=>{
    const{legajo} = req.params;
    const traerAlumno = await db.query ('select usuarios.legajo, nombre, apellido, dni, domicilio, fechaNacimiento from usuarios where usuarios.legajo =?', [legajo]);
    const traerAlumnoTel = await db.query ('select telefono from usuarios_tel where usuarios_tel.legajo =?',[legajo]);
    const traerAlumnoEmail = await db.query ('select email from usuarios_mail where usuarios_mail.legajo =?', [legajo]);
    console.log(traerAlumno)
    console.log(traerAlumnoEmail)
    console.log(traerAlumnoTel)
    res.render('paginas/editarAlumno', {traerAlumno,traerAlumnoTel,traerAlumnoEmail});
    
});
ruta.post('/editarAlumno/:legajo', async (req, res)=>{
    const {legajo} = req.params; 
    const {nombre, apellido, dni, domicilio, fechaNacimiento, email/* , telefono */  } = req.body ;
    //const {telefono} =req.body;
    //const{email}=req.body;
    
    const newUsuario={
        nombre,
        apellido,
        dni,
        domicilio,
        fechaNacimiento,
        
    }
    console.log(newUsuario);
    const newUsuario_mail={
       email,
    }
    console.log(newUsuario_mail);
    //const newUsuario_tel={
       // telefono
    //}
    try {
        const actualizar= await db.query('Update usuarios set? where legajo =?', [newUsuario, legajo]);
       const actUsuarios_mail = await db.query('Update usuarios_mail set? where legajo=?',[newUsuario_mail, legajo]);
        console.log(newUsuario_mail);
        /* const actUsuarios_tel= await db.query('Update usuarios_tel set ? where legajo=?', [newUsuario_tel, legajo]);  */
        if (actualizar, actUsuarios_mail ){
         req.flash('msjbien', 'Datos Actualizados correctamente');
         res.redirect('/paginas/listadoUsuario')
        }
     } catch (error) {
         console.log(error)
         req.flash('msjmal', 'Los Datos no han sido actualizados');
         res.redirect('/paginas/listadoUsuario')
     }
});



module.exports=ruta;