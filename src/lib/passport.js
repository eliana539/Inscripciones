const passport= require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool =require ('../database');
const helpers= require('../lib/helpers');

passport.use('local.registro', new LocalStrategy({
    usernameField: 'dni' ,
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, dni, contrasenia, done)=>{
    const {nombre, apellido, telefono, email } = req.body ;
    const nuevoUsuario = {
        nombre,
        apellido,
        dni,
        contrasenia    
    };    
    nuevoUsuario.contrasenia= await helpers.encryptContrasenia(contrasenia);
    try {
        const final= await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
        nuevoUsuario.legajo = final.insertId;
        if (final) {
            await pool.query('INSERT INTO usuarios_tel SET ?', [{legajo:final.insertId, telefono}]);
            await pool.query('INSERT INTO usuarios_mail SET ?', [{legalo:final.insertId, email}]);
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