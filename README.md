# Middleware

Funciones que se ejecutan cuando se inicia el servidor
Se usan como app.use();
Ej:
app.use(express.static('public'));
Configuro tambien que tipos de archivos puedo recibir en el backend

# Status

403: No esta autenticada la persona

# CORS

Connect/Express middleware
Nos permite proteger nuestro servidor de forma superficial
Tenemos que tenerlo habilitarlo, sino los navegadores tiran error

npm i cors
const cors = require('cors');
app.use(cors());
