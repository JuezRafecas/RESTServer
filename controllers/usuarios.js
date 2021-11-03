const { response } = require('express');

const usuarioGet = (req, res = response) => {

    const {q, p = 'hola', apiKey, page = 1, limit = 10} = req.query;

    res.json({
        msg: 'get API desde el controlador',
        q,
        p,
        apiKey,
        page,
        limit
    });
};
const usuarioPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API desde el controlador',
        nombre,
        edad
    });
};
const usuarioPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API desde el controlador',
        id
    });
};
const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete API desde el controlador'});
};
const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API desde el controlador'});
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}