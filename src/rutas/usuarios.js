const express = require('express');
const ruta = express.Router();
const db = require('../database');

ruta.get('/registro', async (req, res) => {
    res.render('auth/registro')
});
ruta.post('/registro', async (req, res) => {
    res.redirect('/paginas/principal');
});

ruta.get('/inicio', async (req, res) => {
    console.log("Recorda usar esto para ver tus cosas")
    res.render('auth/inicio');
});
ruta.post('/inicio', async (req, res) => {

    console.log(req.body)
    res.redirect('/paginas/principal');
});
ruta.get('/principal', async (req, res) => {
    res.render('paginas/principal');
});
/*ruta.post('/principal', async (req,res)=>{
    res.redirect('')
}); */

ruta.get('/listadousuario', async (req, res) => {
    const usuarios = await db.query('select legajo, nombre, apellido, dni from usuarios');
    res.render('paginas/listadoUsuario', { usuarios });
});
/* ruta.post('/listadoUsuario', async (req, res)=> {
    res.redirect('recibido');
}); */
ruta.get('/informacionalumno/:legajo', async (req, res) => {
    const { legajo } = req.params;
    const alumno = await db.query('select usuarios.legajo, nombre, apellido, dni, domicilio, fechaNacimiento from usuarios where usuarios.legajo =?', [legajo]);
    const alumnoTel = await db.query('select telefono from usuarios_tel where usuarios_tel.legajo =?', [legajo]);
    const alumnoEmail = await db.query('select email from usuarios_mail where usuarios_mail.legajo =?', [legajo]);
    res.render('paginas/informacionAlumno', { alumno, alumnoTel, alumnoEmail });
});
ruta.get('/editaralumno/:legajo', async (req, res) => {
    const { legajo } = req.params;
    const traerAlumno = await db.query('select usuarios.legajo, nombre, apellido, dni, domicilio, fechaNacimiento from usuarios where usuarios.legajo =?', [legajo]);
    const traerAlumnoTel = await db.query('select * from usuarios_tel where usuarios_tel.legajo =?', [legajo]);
    const traerAlumnoEmail = await db.query('select * from usuarios_mail where usuarios_mail.legajo =?', [legajo]);
    res.render('paginas/editarAlumno', { traerAlumno, traerAlumnoTel, traerAlumnoEmail, legajo });

});
ruta.post('/editaralumno/:legajo', async (req, res) => {
    const { legajo } = req.params;
    const { nombre, apellido, dni, domicilio, fechaNacimiento, email/* , telefono */ } = req.body;

    const newUsuario = {
        nombre,
        apellido,
        dni,
        domicilio,
        fechaNacimiento

    };
   
    async function update() {
        for (let i = 0; i < email.length; i++) {
            try {
                const mail = await db.query('insert into usuarios_mail set?', { legajo, email: email[i] })
            } catch (error) {
                console.log(error)
            }
        }
}
    try{
        const borrar = await db.query('delete from usuarios_mail where legajo =?',[legajo])
        if(borrar){
            update() 
        }
    }catch (error){
        console.log(error)
    }
    
    
    

   
   
  
   
    
    try {
        const actualizar = await db.query('Update usuarios set? where legajo =?', [newUsuario, legajo]);
        /* const actUsuarios_tel= await db.query('Update usuarios_tel set ? where legajo=?', [newUsuario_tel, legajo]);  */
        if (actualizar) {


            req.flash('msjbien', 'Datos Actualizados correctamente');
            res.redirect('/paginas/listadoUsuario')
        }
    } catch (error) {
        console.log(error)
        req.flash('msjmal', 'Los Datos no han sido actualizados');
        res.redirect('/paginas/listadoUsuario')
    }

});
ruta.get('/agregarmail/:legajo', async (req,res)=>{
    const {legajo} = req.params
    res.render('paginas/agregarMail', {legajo})
});
ruta.post('/agregarmail/:legajo',async (req,res)=>{
    const { email } = req.body
    const {legajo} =req.params
    const newEmail ={
        legajo,
        email
    }
    
    try{
        const agregarMail = await db.query ('insert into usuarios_mail set?', [newEmail]);
        if(agregarMail){
            req.flash('msjbien', 'Datos Actualizados correctamente');
            res.redirect('/paginas/listadoUsuario')
        }
    }catch(error){
        console.log(error)
        req.flash('msjmal', 'Los Datos no han sido actualizados');
        res.redirect('/paginas/agregarMail/'+ legajo)

    }  
    
})

ruta.get('/agregartel/:legajo', async (req,res)=>{
    const{legajo}= req.params
    res.render('paginas/agregarTel', {legajo})
});
ruta.post('/agregartel/:legajo',async (req,res)=>{
    const { telefono } = req.body
    const {legajo} =req.params
    const newTel ={
        legajo,
        telefono
    }
    
    try{
        const agregarTel = await db.query ('insert into usuarios_tel set?', [newTel]);
        if(agregarTel){
            req.flash('msjbien', 'Datos Actualizados correctamente');
            res.redirect('/paginas/listadoUsuario')
        }
    }catch(error){
        console.log(error)
        req.flash('msjmal', 'Los Datos no han sido actualizados');
        res.redirect('/paginas/agregarTel/'+ legajo)

    }  
    
})
ruta.get('/eliminarmail', async (req,res)=>{
    const{legajo, email}=req.query
  
    console.log(legajo)
    console.log(email)
    try {
        const borrado = await db.query ('delete from usuarios_tel where legajo=? and telefonos=?', [legajo, email])
        if(borrado){
            req.flash('msjbien', 'Datos Actualizados correctamente');
            res.redirect('/paginas/listadoUsuario')
        }
    } catch (error) {
        console.log(error)
        req.flash('msjmal', 'Los Datos no han sido actualizados');
        res.redirect('/paginas/editarAlumno/' + legajo)
        
    }

    res.redirect('/paginas/listadoUsuario')
});
ruta.get('/eliminartel', async (req,res)=>{
    const{legajo, telefono}=req.query

    try {
        const borrado = await db.query ('delete from usuarios_tel where legajo=? and telefonos=?', [legajo, telefono])
        if(borrado){
            req.flash('msjbien', 'Datos Actualizados correctamente');
            res.redirect('/paginas/listadoUsuario')
        }
    } catch (error) {
        console.log(error)
        req.flash('msjmal', 'Los Datos no han sido actualizados');
        res.redirect('/paginas/editarAlumno/' + legajo)
        
    }
 
});


module.exports = ruta;