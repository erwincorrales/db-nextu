const mongoose = require('mongoose'),
url = 'mongodb://localhost/calendar'
mongoose.connect(url, err=>{
    if(err) throw (err)
    console.log('*CONEXION A BASE DE DATOS: conectado a: '+ url)
})

var Schema = mongoose.Schema;

var userSchema = new Schema({
    correo: {type: String, required: true},
    nombre: { type: String, required: true },
    pass: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true }
})

var eventoSchema = new Schema({
     title: {type: String, required: true},
     start: {type: Date, required: true},
     end: {type: Date },
     allDay: {type: Boolean},
     fkUser: {type: Schema.ObjectId, ref: "User"}
})

    let user = mongoose.model('User', userSchema)
    let evento = mongoose.model('Evento', eventoSchema)

var Model = { 
    User: user,
    Evento: evento
}

module.exports = Model;

