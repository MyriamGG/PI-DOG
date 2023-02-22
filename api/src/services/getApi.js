const { Temperament, Image } = require("../db.js");
const axios = require("axios");

function precarga() {
  // Trae info de la api
  axios.get(`https://api.thedogapi.com/v1/breeds`).then((apitemperament) => {
    const tempMap = apitemperament.data.map((temp) => {
      const objImage = {
        reference_image_id: temp.reference_image_id,
        image: temp.image.url,
      };
      Image.create(objImage);

      let str = temp.temperament;
      if (typeof str === "string") {
        let arr = str.split(",");
        return arr;
      }
    });

    let tempArr = [];

    for (let i = 0; i < tempMap.length; i++) {
      if (typeof tempMap[i] !== "undefined") {
        for (let j = 0; j < tempMap[i].length; j++) {
          if (!tempArr.includes(tempMap[i][j].trim())) {
            tempArr.push(tempMap[i][j].trim());
          }
        }
      }
    }

    let temperamentArr = [];
    for (let cont = 0; cont < tempArr.length; cont++) {
      let tempObj = {
        ID: cont + 1,
        name: tempArr[cont],
      };
      temperamentArr.push(tempObj);
    }

    //crear las dietas en la base de datos
    Temperament.bulkCreate(temperamentArr);
  });
}

module.exports = { precarga };

//opvion 2
//module.exports = precarga ;
