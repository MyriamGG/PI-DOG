import React from "react";
import {useEffect, useState} from "react";
import {Link , useParams, useHistory} from 'react-router-dom';
import { getDogDetail,delDog ,cleanDetail} from "../../redux/actions/actions_dogs";
import { useDispatch,useSelector } from "react-redux";
import Create_Update_Dog from '../CreateRaza/Create_Update_Dog'
import './Detail_dog.css'


const Detail_dog = () => { 
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [mostrarComponente, setMostrarComponente] = useState(true);

    useEffect(() => {
        dispatch(getDogDetail(id));
  
        return function(){
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    const myDog = useSelector(state => state.detail);
    const handleRegreso = () => {
        history.push("/home");
    } 

    const handleDelete = (event) => {
        event.preventDefault();//para prevenir o cambiar el evento del formulario
        dispatch(delDog(id));
        alert ('Raza borrada satisfactoriamente! ✓')
        handleRegreso();
    }

    return(
        <>
            <div className="fondo_detail">
                <h2 className="titulo">Detalle de Razas</h2>

                <Link className= "linkDog" to="/home">
                    <button className="boton_detail" onChange={handleRegreso}>VOLVER</button>
                </Link> 
                <div >
                    <img className="imagen_detail" src= {myDog.image} alt="imagen de perrito"/>
                    <p className="texto_detail">nombre:</p> <p className="margen_detail">{myDog.name}</p>
                    <p className="texto_detail">altura:</p> <p className="margen_detail"> {myDog.height? myDog.height: " "}</p>
                    <p className="texto_detail">peso minimo:</p> <p className="margen_detail"> {myDog.min_weight}</p>
                    <p className="texto_detail">peso maximo:</p> <p className="margen_detail"> {myDog.max_weight}</p>
                    <p className="texto_detail">tiempo de vida:</p> <p className="margen_detail"> {myDog.life_span}</p>
                    <p className="texto_detail">temperamento: </p> <p className="margen_detail">{myDog.temperament}</p>
                </div>
                <div className="row">
                    <button onClick={() => setMostrarComponente(!mostrarComponente)} hidden= {id.length > 10? false: true} >
                        {!mostrarComponente ? `Ocultar` : `Modificar Datos`}  
                    </button>
                    <button onClick={handleDelete} hidden={id.length > 10? false : true}>Borrar Raza</button>
                </div>    
                    <div>
                        {!mostrarComponente && <Create_Update_Dog ID={id}/>}
                    </div>
            </div>
        </>
    )
}

export default Detail_dog;