//archivo que por consola crea un usuario en la base de datos calendar

const Model = require('./models.js'),
db = require('./CRUD.js')

var user = new Model.User({
    correo: 'e1max@hotmail.com',
    nombre: "erwin Corrales",
    pass: "clave01",
    fechaNacimiento: '1989-04-15'
})

db.crearUsuario(user, err=>{
    if(err) console.log('error al insertar usuario en DB')
    console.log('*FUNCION CREAR USUARIO: usuario guardado en calendar.users')
})
