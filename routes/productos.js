const { Router } = require('express');
const { check } = require('express-validator');

const {crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto} = require('../controllers/productos');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const router = Router();

//{{url}}//api/productos

//Obtener todas los productos-publico
router.get('/', obtenerProductos); 

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
] , obtenerProducto); 

//Crear un nuevo producto - privado con cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'El id de la categoría es incorrecto').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto); 

//Actualizar producto por id - privado cualquier rol
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    check('categoria', 'No es un ID de válido').optional().isMongoId(),
    check('categoria').optional().custom(existeCategoriaPorId),
    validarCampos
] , actualizarProducto);

//Borrar categoria por id - privado Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId ),
    validarCampos
] , borrarProducto);

module.exports = router;