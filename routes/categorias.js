const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeCategoriaPorId } = require('../helpers/db-validators');
const router = Router();

//{{url}}//api/categorias

//Obtener todas las categorias-publico
router.get('/', obtenerCategorias); 

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] , obtenerCategoria); 

//Crear una nueva categoria - privado con cualquier rol
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria); 

//Actualizar categoria por id - privado cualquier rol
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] , actualizarCategoria);

//Borrar categoria por id - privado Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] , borrarCategoria);

module.exports = router;