Objetivo: Crear un portal permita a los usuarios registrarse e ingresar bajo usuario y contraseña.

#Acciones:
- Identificarnos / Administrador / Usuario
- Adminitrador podrá asignar dinero en cada cuenta
- Los usuarios deben tener la posibilidad de hacer transferencias entre ellos.


#REST Desing:
- Consultar cuenta: GET /user
- Resgristarse: POST /login
- Asignar Dinero: PUT /admin/user/:id/valor
- Realizar transferencia = PUT /user/:id/transferencia/valor
