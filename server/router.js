const express = require('express')
const db = require('./CRUD.js')
const Router = express.Router()


// ruta al consultar si usuario es el correcto
Router.post("/login", (req,res)=>{
    const login = req.body.user
    const password = req.body.pass 

    db.consultarUsuario(login, (err, resp) =>{
            if(err) res.send("fallo al encontrar el usuario")
            else{
                if (resp[0].pass === password){
                    // Iniciar session con datos del usuario  sobre todo el ID
                    req.session.usuario = resp[0].id
                    console.log('*SESSION INICIADA! ID: ' + req.session.usuario + " user: " + resp[0].correo)
                    //enviar aprobacion a pagina login    
                    res.send("Validado")
                }else
                    res.send('Usuario no Encontrado') 
            }
    })
})

//Ruta cargar eventos al iniciar
Router.get("/events/all", (req, res)=>{
    db.consultarEventos(req.session.usuario, (err, resp)=>{
        if(err) throw err
        res.json(resp)
    })
})

//ruta para agregar nuevo evento
Router.post("/events/new", (req,res)=>{
    const ev = {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        allDay: req.body.allDay,
        fkUser: req.session.usuario
    }
    console.log('ROUTER AGREGAR NEW EVENTO: '+ JSON.stringify(ev))
    db.crearEvento(ev, (err)=>{
        if(err) res.send('Error al crear evento!')
        res.send('Evento salvado en db!')
    })
})

//ruta para borrar evento
Router.post('/events/delete/:eventId', (req, res) => {
   console.log('*FUNCION BORRAR EVENTO Param: '+ req.params.eventId)
   db.borrarEvento(req.params.eventId, (err, resp)=>{
        if (err) throw err
        res.send(resp)
   })
})


//ruta para actualizar evento
Router.post('/events/update/:id', (req, res)=>{
  console.log('*FUNCION UPDATE EVENTO Param: '+ req.body.id)
  db.updateEvento(req.body, (err,resp)=>{
     if(err) res.send(err)
     res.send(resp)   
  }) 
})



module.exports = Router