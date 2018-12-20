const express = require('express')
const session = require('express-session')
const Router = require('./router')

const PORT = 3000;
const app = express();

//configurar escritorio raiz paginas publicas servidor y lectura de cabeceras y json
app.use(express.static('../client'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//manejo de sessiones en Nodejs
app.use(session({
    secret: "e1max1983",
    resave: true,
    saveUninitialized: false
}))

//RUTAS DEL SERVIDOR
app.use('/', Router)

//ACTIVACION DE SERVIDOR EXPRESS EN PUERTO 3000
app.listen(PORT,function(){
    console.log("*FUNCION ACTIVAR SERVIDOR EXPRESS Estado: Activo, Puerto: " + PORT)
})



