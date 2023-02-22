const {Router} = require('express');

temperamentRouter = Router();
const {GET_ALL_TEMPERAMENT} = require('../controllers/GET_ALL_TEMPERAMENT');

temperamentRouter.get('/', GET_ALL_TEMPERAMENT);

module.exports = temperamentRouter;