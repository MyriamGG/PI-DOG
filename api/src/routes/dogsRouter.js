const {Router} = require('express');

dogsRouter = Router();
const {GET_ALL_DOGS} = require('../controllers/GET_ALL_DOGS');
const {GET_ID_RAZA} = require('../controllers/GET_ID_RAZA');
const {CREATE_RAZA} = require('../controllers/CREATE_RAZA');
const {PUT_ID_DOG} = require('../controllers/PUT_ID_DOG');
const {DEL_DOG} = require('../controllers/DEL_DOG');

dogsRouter.get('/', GET_ALL_DOGS);
dogsRouter.get('/:idRaza', GET_ID_RAZA);
dogsRouter.post('/create', CREATE_RAZA);
dogsRouter.put('/actuality/:ID', PUT_ID_DOG);
dogsRouter.delete('/delete/:ID', DEL_DOG);

module.exports = dogsRouter;