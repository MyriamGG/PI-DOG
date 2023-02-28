import React from "react";
import { Link } from "react-router-dom";
import RecragaPagina from "../Recarga/RecargaPage";
import './NavBar.css'

export default function NavBar() {
 
  return (
    <div  className='navBarConteiner' >
      <div className='navContent'> 
        <div className='dogs'>Dogs</div>
        <div className='ByMy'>By Myriam</div>
      </div>
      <div className="conteinerMerch">
        <Link className='navLink' to='/'>Inicio</Link> 

        <Link className='navLink' to='/dog'>Crear Raza</Link> 
        <RecragaPagina/>
      </div>
    </div>
  );
} 