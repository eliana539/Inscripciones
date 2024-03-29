const express= require('express');
const ruta = express.Router();
const passport = require('passport');

ruta.get('/registro', (req, res)=>{
    res.render('auth/registro');

});
ruta.post('/registro', passport.authenticate('local.registro', {
    successRedirect: 'paginas/principal',
    failureRedirect: '/registro',
    failureFlash: true    
}));
ruta.get('/inicio', (req, res)=>{
    res.render('auth/inicio');
});
ruta.post('/inicio', (req, res, next)=>{
    passport.authenticate('local.inicio',{
        successRedirect: 'paginas/principal',
        failureRedirect: '/inicio',
        failureFlash: true
    })(req, res, next);
});
ruta.get('/salir' ,(req,res)=>{
    req.logOut();
    res.redirect('/inicio');
}); 

module.exports = ruta; 