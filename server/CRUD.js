const Model = require('./models.js')
const mongoose = require('mongoose')

module.exports.crearUsuario = (user, callback) => {
    user.save(err =>{
      if (err) callback("ERROR")
         callback(null)    
    })
}

module.exports.consultarUsuario = (login, callback) =>{
    console.log("*FUNCION CONSULTAR USUARIO POR LOGIN: user "+ login)
    Model.User.find({correo: login})
    .exec((error, resp) => {
        if (error) callback("error", null)
        else{
            callback(null, resp)      
        }
    })
}

module.exports.crearEvento = (ev, callback) =>{
    console.log('*FUNCION CREAR NUEVO EVENTO EN CALENDARIO')
    const evento= new Model.Evento(ev)

    evento.save(err=>{
        if (err) callback("ERROR crar nuevo evento")
        callback(null, "Evento Guardado en Base de Datos!")
    })
}

module.exports.consultarEventos = (usuario, callback) =>{
    const user = mongoose.Types.ObjectId(usuario)
    Model.Evento.find({fkUser: usuario},{fkUser:0}).exec((error, resp)=>{
        if(error) callback(error, null)
        callback(null, resp)
    })
}

module.exports.borrarEvento = (id, callback)=>{
    Model.Evento.findByIdAndDelete(id).exec(err=>{
        if(err) callback(err)
        callback(null, "Elemento borrado!")
    })
}

module.exports.updateEvento = (parametros, callback)=>{
    let id = mongoose.Types.ObjectId(parametros.id)
    Model.Evento.update({_id: parametros.id}, {$set:{start: parametros.start, end: parametros.end}}, (err, resp)=>{
        if(err) callback(err)
        callback(null, "Evento ha sido modificado en mongodb ")
    })
}
