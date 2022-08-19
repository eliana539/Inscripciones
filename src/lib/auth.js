module.exports={
    estaLogueado(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } return res.redirect('/inicio');
    },
    noEstaLogueado(req, res, next){
        if(!req.isAuthenticated()) {
            return next();
        } return res.redirect('/paginas/inicio');
    },
    admin(req, res, next) {
        if((req.isAuthenticated()) && (req.user.idRol) === 1) {
            return next();
        }return res.redirect('/paginas/inicio');
    }
}
 