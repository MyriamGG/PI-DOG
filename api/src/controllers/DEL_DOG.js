const {Dog} = require('../db.js')

const DEL_DOG = async (req, res) => {
    try{
        const {ID} = req.params;
        idEntero = parseInt(ID,10);
        if (isNaN(ID) && idEntero !== undefined) {
            const razaDB = await Dog.findByPk(ID);
            if (razaDB){
                await Dog.destroy({where: {ID}})
                res.status(200).json({mge: "Fue borrado satisfactoriamente"})
            }
            else throw new Error(`No se encontro id = ${ID}`);
        }
    } catch (error) {
        res.status(400).json({mge: error.message});
    }
}

module.exports = {DEL_DOG};