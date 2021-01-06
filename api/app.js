const express = require('express');
const app = express()
const PORT = 8000
const cors = require('cors')
const users = [
    {
        'id': 1,
        'name': 'Yulian',
        'userName': 'hash',
        'correo': 'yulian@gmail.com',
        'password': '12345',
        'dinero': 0,
        'type': 1 //tipo usuario administrador
    },
    {
        'id': 2,
        'name': 'Pilar',
        'userName': 'pili',
        'correo': 'pili@gmail.com',
        'password': '5678',
        'dinero': 0,
        'type': 2 //tipo usuario normal
    }
]

app.use(express.json());
app.use(cors())

app.post('/register', (req, res)=>{
    const {name, userName, correo, password, dinero} = req.body
    const registerUser = {
        'name': name,
        'userName': userName,
        'correo': correo,
        'password': password,
        'dinero': dinero
    }
    if (registerUser.name.length < 5) {
        res.status(404).json({
            'message': 'Credenciales Incorrectas',
            'status': false
        })
    }
    res.status(200).json({
        'name': name,
        'userName': userName,
        'correo': correo,
        'password': password,
        'dinero': dinero
    })
})

app.post('/login', (req, res)=>{
    const {userName, password} = req.body
    const result = users.filter(user => user.userName === userName && user.password === password)
    console.log(result);
    if (result.length > 0) {
        res.status(200).json({
            'message': 'Credenciales Correctas',
            'status': true
        })
    } else {
        res.status(404).json({
            'message': 'Credenciales Incorrectas',
            'status': false
        })
    }
})

app.get('/user', (req, res)=>{
    res.send('hola mundo')
})

app.listen(PORT, ()=>{
    console.log(`Servidor inicializado en el puerto ${PORT}`);
})