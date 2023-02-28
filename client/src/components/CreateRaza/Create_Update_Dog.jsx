import { useState } from "react";
import { crearDogs, putDogs  } from "../../redux/actions/actions_dogs";
import { temperaments  } from "../../redux/actions/actions_temperament";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import '../CreateRaza/Form.css'

const initialForm = {
      ID: "",
      name: "",
      height: "",
      weight: "",
      life_span: "",
      imagen: "",
      temp: [],
    }

const initialMax_min = {
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
}
   
const initialError = {
    ID: "",
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    imagen: "",
    temp: [],
    tempName: [],
    }

let tempArr = [];
let tempArrName = [];

const Create_Update_Dog = (props) => {
    const id = props.ID;

    const [form, setForm] = useState(initialForm);
    const [max_min, setMax_min] = useState(initialMax_min)
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

    const ActiveButton = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(crearDogs(form));
        alert ('Raza creada Satisfactoriamente! ✓')
        handleReset();
        history.push("/home");
    }

    const ActiveButtonPut = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(putDogs(form, id));
        alert ('Raza actualizada satisfactoriamente! ✓')
        handleReset();
        history.push("/home");
    }

    function valida(property, value){
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

        if (property === "height_min") {
            mgeError = validaMaxMin(parseInt(value,10), 10, 0, "altura");
            setError({[property]: mgeError});
        }
        if (property === "height_max") {
            mgeError = validaMaxMin(parseInt(value,10), max_min.height_min, 110,"altura");
            setError({[property]: mgeError});
        }
    
        if (property === "weight_min") {
            mgeError = validaMaxMin(parseInt(value,10), 5, 0, "peso");
            setError({[property]: mgeError});
        }
    
        if (property === "weight_max") {
            mgeError = validaMaxMin(parseInt(value,10), max_min.weight_min, 65,"peso");
            setError({[property]: mgeError});
        }

        if (property === "life_span_min") {
            mgeError = validaMaxMin(parseInt(value,10), 7, 0, "vida");
            setError({[property]: mgeError});
        }

        if (property === "life_span_max") {
            mgeError = validaMaxMin(parseInt(value,10), max_min.life_span_min, 20,"vida");
            setError({[property]: mgeError});
        }
    }

    function validaMaxMin(valor, min, max, caracteristica){
        let mgeError = "";

        if (max === 0 && valor < min) mgeError = `Coloque un valor igual o superior a ${min} de ${caracteristica}`
        if (max !== 0 && valor <= min) mgeError = `Coloque un valor superior a ${min}`;
        if (max !== 0 && valor > max) mgeError = `Coloque un valor menor o igual a ${max} de ${caracteristica}`
        
        return mgeError;
    }

    function concateno (min, max) {
        return (min.toString()+"-"+max.toString())
    }

    const changeHandler = (event) => {
        let property = event.target.name
        let value = event.target.value
        valida(property, value);

        setMax_min({
            ...max_min,
            [property]: value
        })

        if (property === "height_max") {
            property = "height";
            value = concateno(max_min.height_min, value);
        }
        if (property === "weight_max"){
            property = "weight";
            value = concateno(max_min.weight_min, value);
        }
        if (property === "life_span_max"){
            property = "life_span";
            value = concateno(max_min.life_span_min, value);
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
            <div className="caja">
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
                                <label className="texto" htmlFor="height_min" >Altura Minima:</label>
                                <input  
                                    name = 'height_min' 
                                    value ={max_min.height_min} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.height_min && <p>{error.height_min}</p>}

                            <div>
                                <label className="texto" htmlFor="height_max" >Altura Maxima:</label>
                                <input  
                                    name = 'height_max' 
                                    value ={max_min.height_max} 
                                    onChange={changeHandler}
                                />
                            </div>
                            {error.height_max && <p>{error.height_max}</p>}

                            <div>
                                <label className="texto" htmlFor="weight_min" >Peso Minimo:</label>
                                <input  
                                        name = 'weight_min' 
                                        value ={max_min.weight_min} 
                                        onChange={changeHandler}
                                />
                            </div> 
                            {error.weight_min && <p>{error.weight_min}</p>}

                            <div>
                                <label className="texto" htmlFor="weight_max" >Peso Maximo:</label>
                                <input  
                                        name = 'weight_max' 
                                        value ={max_min.weight_max} 
                                        onChange={changeHandler}
                                />
                            </div> 
                            {error.weight_max && <p>{error.weight_max}</p>}

                            <div>
                                <label className="texto" htmlFor="life_span_min" >Tiempo de vida Minimo:</label>
                                <input  type={"string"} 
                                        name = 'life_span_min' 
                                        value ={max_min.life_span_min} 
                                        onChange={changeHandler}
                                />
                            </div>
                            {error.life_span_min && <p>{error.life_span_min}</p>}
                  
                            <div>
                                <label className="texto" htmlFor="life_span_max" >Tiempo de vida Maximo:</label>
                                <input  type={"string"} 
                                        name = 'life_span_max' 
                                        value ={max_min.life_span_max} 
                                        onChange={changeHandler}
                                />
                            </div>
                            {error.life_span_max && <p>{error.life_span_max}</p>}
                        </div>

                        <div className="borde_form">
                            <select name= 'temp' multiple onChange={e => tempChangeHandler(e)}>
                                <option value="temp">Temperamentos</option>
                                    {temperament.map(temp => 
                                        <option key={temp.name} value={temp.name}>{temp.name} </option>
                                    )}
                            </select>
                            <div>
                                <label className="texto" htmlFor="temperament">Temperamentos: </label>
                                <label className="texto">{form.tempName + ", "}</label>
                            </div>
                        </div>
                        {error.temp && <p>{error.temp}</p>}
                       
                    </form>

                    <Link to="/home">
                        <button  onClick={ActiveButton} hidden={props.ID? true : false} disabled={!form.name || !form.imagen || !max_min.height_min || !max_min.height_max || form.temp.length === 0 || error} >CREAR</button>
                        <button  onClick={ActiveButtonPut} hidden={props.ID? false : true} disabled={!form.name && !form.imagen && !form.height && !form.weight && error}>Actualizar</button>
                    </Link> 

                </div>
            </div>
            </div>
        </>
    )
}

export default Create_Update_Dog;


// || !max_min.weight.min || !max_min.weight_max || !max_min.life_span_min || !max_min.life_span_max || 
