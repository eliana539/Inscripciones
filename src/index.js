const express= require('express');
const morgan= require('morgan');
const exphbs = require('express-handlebars');
const path=require('path');

//INICIALIZACIONES
const app = express();
//SETTINGS (confiuraciones que requiere mi servidor express)
app.set('port', process.env.PORT||5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join (app.get('views'), 'layouts'),
    partialsDir:path.join (app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require(`./lib/handlebars`)
}));
app.set(`view engine`, `.hbs`);
//MIDDLEWARES(se ejecutan cada vez que el ususario hace una peticion al servidor)
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//GLOBAL VARIABLES
app.use((req,res,next)=>{
    next();
});
//ROUTES (rutas del servidor)

app.use(require('./rutas'));
app.use(require('./rutas/authentication'));
app.use(`/usuarios`,require('./rutas/usuarios'));
   
//PUBLIC

app.use(express.static(path.join(__dirname,`public`)));
//STARTING THE SERVER (inicializar el servidor)
app.listen(app.get('port'),()=>{
    console.log('Conectado en puerto', app.get('port'));
});
