const passport= require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =require ('../database');
const helpers= require('../lib/helpers');

passport.use('local.inicio', new LocalStrategy({
    usernameField: 'dni',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, dni, contrasenia, done) => {
    console.log(req.body);
     const fila= await pool.query ('SELECT * from usuarios WHERE dni = ?', [dni]);
    if(fila.length > 0){
        const usuarios = fila[0];
        const contraseniavalida= await helpers.compararContrasenia(contrasenia, usuarios.contrasenia);
        if(contraseniavalida){
            done(null, usuarios, req.flash('msjbien','Bienvenido  ' + usuarios.nombre));
        }else{
            done(null, false, req.flash('msjmal','contraseña Incorrecta'));
        }
    }else{
        return done(null, false, req.flash('msjmal','Usuario Inexistente'));
    }
}));

passport.use('local.registro', new LocalStrategy({
    usernameField: 'dni' ,
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, dni, contrasenia, done)=>{
    const {nombre, apellido, domicilio, fechaNacimiento, telefono, email } = req.body ;
    console.log(req.body);
    const nuevoUsuario = {
        nombre,
        apellido,
        dni,
        contrasenia,
        domicilio,
        fechaNacimiento    
    };    
    nuevoUsuario.contrasenia= await helpers.encryptContrasenia(contrasenia);
    try {
        const final= await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
        nuevoUsuario.legajo = final.insertId;
         if (final) {
            await pool.query('INSERT INTO usuarios_tel SET ?', [{legajo:final.insertId, telefono}]);
            await pool.query('INSERT INTO usuarios_mail SET ?', [{legajo:final.insertId, email}]);
        }
        return done(null, nuevoUsuario);
    } catch (error) {
        console.log(error);
    }
}));
 passport.serializeUser((usuario, done)=>{
    done(null, usuario.legajo);
 });
 passport.deserializeUser(async(legajo, done)=>{
    const filas = await pool.query('select * from usuarios where legajo = ?', [legajo]);
    done(null, filas[0]);
 });