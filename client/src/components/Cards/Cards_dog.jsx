import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { obtenerDogs, filterDogsbyOptions, filterDogsbyCreation, order, cleanDog } from '../../redux/actions/actions_dogs';
import { temperaments } from '../../redux/actions/actions_temperament';
import Paginadonumerico from '../Paginado/Paginadonumerico';
import './Cards_dog.css'
import Card_dog from '../Card/Card_dog';

function Cards_dog() {

    const [search, setSearch] = useState({name:" "})
    const [orden, setOrden] = useState('');

    const ITEMS_PER_PAGE = 8;
    const [currentPage, setcurrentPage] = useState(1)


    
    const dispatch = useDispatch(); 
    useEffect(() =>{
        dispatch(obtenerDogs());
        dispatch(temperaments());
        return function(){
            dispatch(cleanDog());
            handleClick();
        };
    },[dispatch]);

    let allDogs = useSelector(state => state.dogs);
    const temp = useSelector(state => state.temp);
    
    const indexOfLastCharacters = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstCharacters = indexOfLastCharacters - ITEMS_PER_PAGE;
    const currentCharacters = allDogs.slice(indexOfFirstCharacters, indexOfLastCharacters)

    const paginado = (numberPage) => {
        setcurrentPage(numberPage);
    }

    function handlerSearch(event){

        const property = event.target.name
       let value = event.target.value
       setSearch({
           ...search,
           [property]: value
       })
       dispatch(obtenerDogs(search.name))
       setcurrentPage(1);
   }
const clear = () => {
    setSearch({name:" "});
}

const handleFilterOptions = (event) =>{
    dispatch(filterDogsbyOptions(event.target.value));
    setcurrentPage(1);
}

const handleFiltercreations = (event) => {
    dispatch(filterDogsbyCreation(event.target.value));
    setcurrentPage(1);
}
const handleAlfa_weight = (event) => {
    event.preventDefault();
    dispatch(order(event.target.value))
    setOrden(`ordenado ${event.target.value}`)
}

const handleClick = (event) => {
    window.location.reload();
}

return(
    <>
        <div className='fondo_color'>
            <br/>

            
            <form>
                <label className="label">Escriba la raza </label>
                <input  type={"text"} 
                        name = 'name' 
                        value ={search.name} 
                        placeholder= "name..."
                        onChange={handlerSearch}
                        />
                <button onclick={clear}>Limpiar</button>
            </form>
            
            <div>
                <select onChange={e => handleFiltercreations(e)}>
                    <option>Elegir Opcion de Creacion</option>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                <select name= 'temp' onChange={e => handleFilterOptions(e)}>
                    <option>Elegir Opcion por Temperamento</option>
                    <option value="All">Todos</option>
                    {temp.map(temp => 
                        <option key={temp.name} value={temp.name}>{temp.name}</option>
                    )}
                </select>
                <select onChange={handleAlfa_weight}>
                    <option>Elegir Opcion de Orden</option>
                    <option value="Alfa_asc"> Alfabetico Ascendente </option>
                    <option value="Alfa_desc">Alfabetico Descendente</option>
                    <option value="Peso_asc"> Peso Ascendente </option>
                    <option value="Peso_desc"> Peso Descendente </option>
                </select>
            </div>
            <Paginadonumerico
                 itemsPerPage={ITEMS_PER_PAGE}
                 allVideos={allDogs.length}
                 paginado={paginado}
                 nropage={currentPage}
             /> 
    
        {
            currentCharacters.map((dog)=> 
                // eslint-disable-next-line react/jsx-pascal-case
                <Card_dog
                    key={dog.ID}
                    id = {dog.ID}
                    name = {dog.name} 
                    imagen = {dog.image} 
                    pesoMin = {dog.min_weight}
                    pesoMax = {dog.max_weight}
                    temperament = {dog.temperament}
                /> )
        }   
            </div>
    </>
)
}

export default Cards_dog
