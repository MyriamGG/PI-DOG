const {Dog, Image, Temperament} = require('../db.js')

function valida(valor, min, max, caracteristica){
    let strNum = [];
    if (valor.includes("-")) strNum = valor.split("-")

     else if (valor.includes("_"))  strNum = valor.split("_")

      else  throw new Error("Debe incluir un guion (-/_) intermedio");

    if (strNum !== [])
    {
        let strTotal = strNum[0] + strNum[1];
        let isNumeric = true;
        for (let i = 0; i < strTotal.length; i++){
            if (!strTotal[i].match("[0-9]+")) isNumeric = false;
        }
        if (isNumeric){
            let arrayResult = [];
            for (let i = 0; i < strTotal.length; i++){
                arrayResult.push(isNaN(parseInt(strTotal[i],10)));
            }

            if (valor.length > 6 || arrayResult.includes(true)){ throw new Error("El formato debe ser valor minimo hasta 2 digitos-valor maximo hasta 3 digitos")}
             else {

                if (parseInt(strNum[0],10) > parseInt(strNum[1],10)) throw new Error(`El numero ${strNum[0]} debe estar a la izquierda de ${strNum[1]}`);
                if (parseInt(strNum[0],10) === parseInt(strNum[1],10)) throw new Error('Coloque valores diferentes');
                if (strNum[0] < min) throw new Error(`Coloque un valor igual o superior a ${min} de ${caracteristica}`);
                if (strNum[1] > max) throw new Error(`Coloque un valor menor o igual a ${max} de ${caracteristica}`);
            }
        }  else throw new Error("Debe colocar solo numeros");
    }
}

const CREATE_RAZA = async (req, res) => {
    try{
        const {name, height, weight, life_span, imagen, temp} = req.body;
        if (!name || !height || !weight || !life_span || !imagen) throw new Error("Faltan Datos");

        if (!(imagen.match( /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null )) {
                throw new Error("El link provisto no es una imagen");
            }

        valida(height, 10, 110,"altura");
        valida(weight, 5, 65,"peso");
        valida(life_span, 7, 20,"vida");

        const newDog = await Dog.create({name, height, weight, life_span, imagen});
        await newDog.addTemperament(temp);

        res.status(200).send("Creado Satisfactoriamente");
    } catch (error) {
        res.status(400).json({mge: error.message});
    }
}

module.exports = {CREATE_RAZA};