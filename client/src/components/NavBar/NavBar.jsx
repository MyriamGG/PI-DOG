import React from "react";
import { Link } from "react-router-dom";
import {SearchBar} from "../SearchBar/SearchBar";
import './NavBar.css'

export default function NavBar() {
 
  return (
    <div  className='navBarConteiner' >
      <div className='navContent' > 
        <div className='dogs'>Dogs</div>
        <div className='ByMy'>By Myriam</div>
      </div>
      <div /*  className='navContent' */ >
      <Link className='navLink' to='/home'>Home</Link> 
      <br></br>
       <Link className='navLink' to='/dog'>Crear Dog</Link> 
       <br></br>
      <SearchBar className='navSearchBar'/>
    </div>
      </div>
  );
} 