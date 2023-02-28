import React from "react";
import { Link } from "react-router-dom";
import './Card_dog.css';

const Card_dog = (props) => {

    return (
        <>
            
            <div className="row">
                <div className="column">
                    <div className="card_btn">
                      

                        <Link to={`/dogDetail/${props.id}`}>
                            <p className="texto_dog">{props.name}</p>
                            <img src= {props.imagen}  width='200px' height='150px'/> 
                        </Link> 

                        
                        <p className="texto_dog">peso_minimo: {props.pesoMin}</p>
                        <p className="texto_dog">peso_maximo: {props.pesoMax}</p>
                        <p className="texto_dog">Temperamnto: {props.temperament}</p>
                    </div>
                </div>
           </div>
        </>
    )
}

export default Card_dog;