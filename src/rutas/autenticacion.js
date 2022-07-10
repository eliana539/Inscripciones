const express= require('express');
const ruta = express.Router();
const passport = require('passport');

ruta.get('/registro', (req, res)=>{
    res.render('auth/registro')

});
ruta.post('/registro', passport.authenticate('local.registro', {
    successRedirect: 'usuarios/principal',
    failureRedirect: '/registro',
    failureFlash: true    
}));

module.exports = ruta; 