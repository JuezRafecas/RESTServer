const express = require('express');
const cors = require('cors');
const dbConnection = require('../db/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json()); //Aviso que voy a recibir JSON (serializo a JSON)
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
    
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}

module.exports = Server;