const axios = require('axios');
const { where } = require('sequelize');
const {Dog, Temperament} = require('../db');

const PUT_ID_DOG = async (req, res) =>{
    try{
        let {ID} = req.params;

        let {name, height, weight, life_span, imagen, temp} = req.body;

        if(!name && !height && !weight && !life_span && !imagen) throw new Error("Faltan Datos");
                
        const buscoDog = await Dog.findByPk(ID,  {
          include: [{model: Temperament, 
             attributes: ["ID", "name"],
             through: {
                  attributes: [],
              }
              }]
          });

          console.log("temp", temp)
        if (buscoDog){
          if (!name) name = buscoDog.name;
          if (!height) height = buscoDog.height;
          if (!weight) weight = buscoDog.weight;
          if (!life_span) life_span = buscoDog.life_span;
          if (!imagen) imagen = buscoDog.imagen;
          if (!temp) {
            temp = buscoDog.temperaments.map((temp) => temp.ID);
            console.log("temperamentos", temp);
          }
      
          
          const dogActualizado = await Dog.update({name, height, weight, life_span, imagen}, 
                                                  {where: {ID}},
                                                  {include: [{model: Temperament,
                                                    attributes: ["ID"],
                                                    througth: {
                                                        attributes: [],
                                                    }}]});
  
          res.status(200).json({ success: "actualizado" });
        }
         else throw new Error("No existe raza");
   } catch (error) {
     res.status(400).json({mge: error.message});
     }
}

module.exports = {PUT_ID_DOG}; 
