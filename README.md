# WebServer + RestServer

Recordar que se debe ejecutar ```npm install``` para reconstruir los modulos de Node

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

# Mongoose

Conectar nuestra app con Atlas en la nube
Es un ODM (Object Data Modeling)
Nos facilita el manejo con mongo desde el codigo

# bcryptJS

Encripta contrasenas

# express-validator

Es una gran coleccion de Middlewares
Para validar campos como email

# JWT

```npm i jsonwebtoken```

# Heroku

```git push heroku main```
```heroku config:set ALGO=ALGOKEY```
```heroku logs -n 1000```

Si le agrego --tail, tengo la info en tiempo real de los logs

# Google Sing In

```npm install google-auth-library --save```

# Manejo de archivos

```npm install express-fileupload```

# Cloudinary para hosting de imagenes

```npm i cloudinary```
