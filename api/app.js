const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8000;
const cors = require('cors');

const key = '56688090F2E072F66D5EACA9EAEB42E47A508B5232256ACDEB72D7B6B81D0A7A';

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
app.use(helmet())


const validateJwtMiddleware = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    console.log(jwtClient);
    jwt.verify(jwtClient, key, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        next();
    });
};

app.post('/islogin', validateJwtMiddleware, (req, res) =>{
    res.status(200).json({
        'status' : true, 
        'message' : "usuario logueado correctamente"
    })
});


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
    const result = users.filter(user => user.userName == userName && user.password == password)
    console.log(result);
    console.log(userName, password);
    if (result.length > 0) {

        const payload = {
            usuario: userName,
            password: password
        }
        const token = jwt.sign(payload, key, {
            expiresIn:120
        });

        res.status(200).json({
            'message': 'Credenciales Correctas',
            'status': true, 
            'jwt':token
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