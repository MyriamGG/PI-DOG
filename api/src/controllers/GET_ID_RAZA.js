const axios = require('axios');
const {Dog, Temperament, Image} = require('../db.js')

async function objeto(raza, origen){  
    const imageID = raza.reference_image_id;
    const imageUrl = await Image.findByPk(imageID);
    const dogId = {
        ID: origen === "DB"? raza.ID : raza.id,
        name: raza.name,
        height: origen === "DB" ? raza.height : raza.height.metric,
        min_weight: origen === "DB"? parseInt(raza.weight.split("-")[0]) : parseInt(raza.weight.metric.split("-")[0]),
        max_weight: origen === "DB"? parseInt(raza.weight.split("-")[1]) : parseInt(raza.weight.metric.split("-")[1]),
        life_span: raza.life_span,
        image: origen === "DB"? raza.imagen : imageUrl? imageUrl.image : "Sin imagen",
        temperament: origen === "DB"? raza.temperaments?.map((temp) => temp.name).join(", ") : raza.temperament,
    };
    return dogId;
}

async  function buscoDB(idRaza){
    const razaDB = await Dog.findByPk(idRaza, {
        include: [{model: Temperament, 
           attributes: ["ID", "name"],
           through: {
                attributes: [],
            }
            }]
        })
    const obj = objeto(razaDB, "DB");
    return obj;
}

async function buscoApi(idRaza){
    const razaApi = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
    const obj = objeto(razaApi.data, "API");
    return obj;
}

const GET_ID_RAZA = async (req,res)=>{
    try{
        const {idRaza} = req.params;
        idEntero = parseInt(idRaza,10);
        if (isNaN(idRaza) && idEntero !== undefined) {
           const dogDB = await buscoDB(idRaza);
           if (!dogDB) throw new Error(`No existe un perro con Id: ${idRaza}`);
            res.status(200).json(dogDB);
        }
        else {
            const dogApi = await buscoApi(idRaza);
            if (!dogApi) throw new Error(`No existe un perro con Id: ${idRaza}`);
            res.status(200).json(dogApi);
        }
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

module.exports = {GET_ID_RAZA};