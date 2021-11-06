const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarCategorias = async( termino = '', res = response) =>{

    const esMongoID = ObjectId.isValid( termino);

    if( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    } 

    const regexp = new RegExp(termino, 'i'); //Case in-sensitive and order

    const categorias = await Categoria.find({nombre: regexp, estado: true});

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response) =>{

    const esMongoID = ObjectId.isValid( termino);

    if( esMongoID ) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    } 

    const regexp = new RegExp(termino, 'i'); //Case in-sensitive and order

    const productos = await Producto.find({nombre: regexp, estado: true})
                                        .populate('categoria','nombre');

    res.json({
        results: productos
    });

}

const buscarUsuarios = async( termino = '', res = response) =>{

    const esMongoID = ObjectId.isValid( termino);

    if( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    } 

    const regexp = new RegExp(termino, 'i'); //Case in-sensitive and order

    const usuarios = await Usuario.find({
        $or: [{nombre: regexp}, {correo: regexp}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    });

}

const buscar = (req, res = response) =>{

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Busqueda no indexada en servidor'
            });
            break;
    }
}

module.exports = {
    buscar,
}