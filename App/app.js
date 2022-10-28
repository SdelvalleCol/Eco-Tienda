const express = require('express');
const path = require('path');
const app = express();
const pool = require('./db/db');

app.listen(3000, () => {
    console.log("Server ONLIVE");
});

app.use(express.static('img'));
app.use(express.static('css'));
app.use(express.static('js'));

//RUTAS 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/main.html'))
});

app.get('/usuario/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/login.html'))
});

app.get('/usuario/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/registro.html'))
});


//APIS

app.get('/api/busqueda/:correo',(req,res)=>{
    var correo = req.params.correo
    pool.query(`SELECT * FROM personas where correo = '${correo}' `, async (error, resultss) =>{
        res.json(resultss)
    })
})

app.get('/api', (req, res) => {
    pool.query(`SELECT * FROM personas `, async (error, results) =>{
        res.json(results)
    })
});

app.post('/api/ingresar/:nombre/:apellido/:correo/:contrasena',(req,res)=>{
    let p = req.params
    pool.query(`insert into personas(correo,contrasena,nombre,apellido) values ('${p.correo}','${p.contrasena}','${p.nombre}','${p.apellido}')`, async (error, results) =>{
        if(error){
            console.log(error)
            res.status(204).end()
        }else{
            console.log("exito")
            res.status(204).end()
        }
    })
})

app.get('*',(req,res)=>{
    res.send("error 404")
})