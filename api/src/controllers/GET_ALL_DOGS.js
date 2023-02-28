const axios = require("axios");
const { Dog, Temperament, Image } = require("../db.js");
const { Op } = require("sequelize");

const GET_ALL_DOGS = async (req, res) => {
  let URL = " ";
  try {
    const name = req.query.name;

    if (!name) URL = "https://api.thedogapi.com/v1/breeds";
    else URL = `https://api.thedogapi.com/v1/breeds/search?name=${name}`;
    const dogsApi = await buscoenApi(name, URL);
    const dogsDB = await buscoenDB(name);

    const dogsAll = [...dogsDB, ...dogsApi];
    res.status(200).send(dogsAll);
  } catch (error) {
    res.status(400).json({ mge: error.message });
  }
};

async function buscoenApi(name, url) {
  const dogsApi = await axios.get(url);
  if (!dogsApi.data) throw new Error(`No Existe un perro con nombre ${name}`);
  else {
    const dogsMap = await Promise.all(
      dogsApi.data.map((dog) => {
        const obj = objeto(dog, "API");
        return obj;
      })
    );
    return dogsMap;
  }
}

async function objeto(raza, origen) {
  const imageID = raza.reference_image_id;
  const imageUrl = await Image.findByPk(imageID);

  const dogObj = {
    ID: origen === "DB" ? raza.ID : raza.id,
    name: raza.name,
    height: origen === "DB" ? raza.height : raza.height.metric,
    min_weight:
      origen === "DB"
        ? parseInt(raza.weight.split("-")[0])
        : parseInt(raza.weight.metric.split("-")[0]),
    max_weight:
      origen === "DB"
        ? parseInt(raza.weight.split("-")[1])
        : parseInt(raza.weight.metric.split("-")[1]),
    life_span: raza.life_span,
    image:
      origen === "DB" ? raza.imagen : imageUrl ? imageUrl.image : "Sin imagen",
    temperament:
      origen === "DB"
        ? raza.temperaments?.map((temp) => temp.name).join(", ")
        : raza.temperament,
  };

  return dogObj;
}

async function buscoenDB(name) {
  if (name) {
    console.log(name);
    const dogsDB = await Dog.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Temperament,
        attributes: ["name"],
        througth: {
          attributes: [],
        },
      },
    });
    if (!dogsDB) throw new Error(`No Existe un perro con nombre ${name}`);
    else {
      const dbHome = await Promise.all(
        dogsDB?.map((dog) => {
          const obj = objeto(dog, "DB");
          return obj;
        })
      );

      return dbHome;
    }
  } else {
    const dogsDB = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        througth: {
          attributes: [],
        },
      },
    });

    const dbHome = await Promise.all(
      dogsDB?.map((dog) => {
        const obj = objeto(dog, "DB");
        return obj;
      })
    );

    return dbHome;
  }
}

module.exports = { GET_ALL_DOGS };
