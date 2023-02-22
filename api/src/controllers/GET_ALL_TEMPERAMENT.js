const {Temperament} = require('../db.js')

const GET_ALL_TEMPERAMENT = async (req, res) =>{
    try{
        const temperamentBD = await Temperament.findAll();
        res.status(200).json(temperamentBD);
    }
    catch (error) {
        res.status(400).json({mge: error.message});
    }
}

module.exports = {GET_ALL_TEMPERAMENT};