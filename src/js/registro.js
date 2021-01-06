//Variables
const name = document.getElementById('name');
const userName = document.getElementById('userName');
const correo = document.getElementById('correo');
const password = document.getElementById('passID')
const submit = document.getElementById('submit')


//Event Listeners


function registrarUsuario() {
    let usuario = {
        name: name.value,
        userName: userName.value,
        correo: correo.value,
        password: password.value
    }

    let result = apiFetchPOST('https://5ff5063516cf4f0017c20d0b.mockapi.io/api/v1/registry', usuario);
    result.then((resp) => {
        console.log(resp);
    }).catch((error) => {
        console.log(error);
    })
    
}

submit.addEventListener('click', registrarUsuario)

