import { useState } from "react";
import { crearDogs, putDogs  } from "../../redux/actions/actions_dogs";
import { temperaments  } from "../../redux/actions/actions_temperament";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {Link, useHistory} from "react-router-dom";

const initialForm = {
      ID: "",
      name: "",
      height: "",
      weight: "",
      life_span: "",
      imagen: "",
      temp: [],
    }

   
const initialError = {
    ID: "",
    name: "",
    height: "",
    weight: "",
    life_span: "",
    imagen: "",
    temp: [],
    tempName: [],
    }

let tempArr = [];
let tempArrName = [];

const Create_Update_Dog = (props) => {
    const id = props.ID;

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(initialError);
    
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(temperaments());
    },[dispatch]);

    const temperament = useSelector(state => state.temp);

    const handleReset = (event) => {
        setForm(initialForm)
        tempArr = [];
        setError(initialError)   
    }

    const submitHandler = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(crearDogs(form));
        alert ('Raza creada Satisfactoriamente! ✓')
        handleReset();
        history.push("/home");
    }

    const submitHandlerActual = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(putDogs(form, id));
        alert ('Raza actualizada satisfactoriamente! ✓')
        handleReset();
        history.push("/home");
    }

    function valida(valor, min, max, caracteristica){
        let strNum = [];
        let mgeError = "";

        if (valor.includes("-")) strNum = valor.split("-")
    
         else if (valor.includes("_"))  strNum = valor.split("_")
    
          else  
            mgeError = "Debe incluir un guion (-/_) intermedio"

     
        if (strNum !== [])
        {
            let strTotal = strNum[0] + strNum[1];
            let arrayResult = [];
            for (let i = 0; i < strTotal.length; i++){
                arrayResult.push(isNaN(parseInt(strTotal[i],10)));
            }
    
            if (valor.length > 6 || arrayResult.includes(true)){ throw new Error("El formato debe ser valor minimo hasta 2 digitos-valor maximo hasta 3 digitos")}
             else {
                if (strNum[0] < min) mgeError = `Coloque un valor igual o superior a ${min} de ${caracteristica}`
  
                if (strNum[1] > max) mgeError = `Coloque un valor menor o igual a ${max} de ${caracteristica}`
    
             }
        }
        return mgeError;
    }

    const changeHandler = (event) => {
        const property = event.target.name
        let value = event.target.value

        let mgeError = "Falta Dato";

        if (value.length === 0) setError({[property]: mgeError})
            else setError("");
        if (property === 'temp') value = value.split(',');
        if (property === "imagen" && value &&
            !(value.match(
                /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
              ) !== null
            )
          ) {
            mgeError = "El link provisto no es una imagen"
            setError ({[property]: mgeError});
          }
        if (property === "height") {
            mgeError = valida(value, 10, 110,"altura");
            setError({[property]: mgeError});
        }
        if (property === "weight") {
            mgeError = valida(value, 5, 65,"peso");
            setError({[property]: mgeError});
        }
        if (property === "life_span") {
            mgeError = valida(value, 7, 20,"vida");
            setError({[property]: mgeError});
        }

        setForm({
            ...form,
            [property]: value
        })
    }


    const tempChangeHandler = (event) => {

        const propertyT = "temp"  
        const propertyN = "tempName"
        setError("")
        let nameTemp = event.target.value;
        const infoTemp = temperament?.find((temp) => temp.name === nameTemp);
        const value = infoTemp.ID;
        const name = infoTemp.name;
        if (!tempArr.includes(value)) {
            tempArr.push(value);
            tempArrName.push(name);
        }
         else {
            tempArr = tempArr.filter(v => v !== value);
            tempArrName = tempArrName.filter(N => N !== name);
        }

        let mgeError = "Falta Dato";
        if (tempArr.length === 0) setError({[propertyT]: mgeError})
        setForm({
            ...form,
            [propertyT]: tempArr,
            [propertyN]: tempArrName,
        })
    } 

    return(
        <>
            <div className="fondo_form">
                <div className="posicion_form">
                    <form className={error && "error"} >
                        <div className="borde_form">
                            <h2 className="titulo">Complete el formulario</h2>
                            <div>
                                <label className="texto" htmlFor="name">Nombre:</label>
                                <input 
                                    name = 'name' 
                                    value ={form.name} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.name && <p>{error.name}</p>}
                
                            <div>
                                <label className="texto" htmlFor="imagen">Imagen:</label>
                                <input  
                                    name = 'imagen'
                                    value ={form.imagen} 
                                    onChange={changeHandler} 
                                />
                            </div>
                            {error.imagen && <p>{error.imagen}</p>}

                            <div>
                                <label className="texto" htmlFor="height" >Altura:</label>
                                <input  
                                    name = 'height' 
                                    value ={form.height} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.height && <p>{error.height}</p>}

                            <div>
                                <label className="texto" htmlFor="weight" >Peso:</label>
                                <input  
                                        name = 'weight' 
                                        value ={form.weight} 
                                        onChange={changeHandler}
                                />
                            </div> 
                            {error.weight && <p>{error.weight}</p>}

                            <div>
                                <label className="texto" htmlFor="life_span" >Tiempo de vida:</label>
                                <input  type={"string"} 
                                        name = 'life_span' 
                                        value ={form.life_span} 
                                        onChange={changeHandler}
                                />
                            </div>
                            {error.life_span && <p>{error.life_span}</p>}
                            <div>
                                <label className="texto" htmlFor="temperament">Temperamentos: </label>
                                <label className="texto">{form.tempName + ", "}</label>
                            </div>
                        </div>

                        <div className="borde_form">
                            <select name= 'temp' multiple onChange={e => tempChangeHandler(e)}>
                                <option value="temp">Temperamentos</option>
                                    {temperament.map(temp => 
                                        <option key={temp.name} value={temp.name}>{temp.name} </option>
                                    )}
                            </select>
                        </div>
                        {error.temp && <p>{error.temp}</p>}
                       
                    </form>

                    <Link to="/home">
                        <button  type= "submit" onClick={submitHandler} hidden={props.ID? true : false} disabled={!form.name || !form.imagen || !form.height || !form.weight || form.temp.length === 0 || error}>CREAR</button>
                        <button  type="submit" onClick={submitHandlerActual} hidden={props.ID? false : true} disabled={!form.name && !form.imagen && !form.height && !form.weight && error}>Actualizar</button>
                    </Link> 

                </div>
            </div>
        </>
    )
}

export default Create_Update_Dog;



