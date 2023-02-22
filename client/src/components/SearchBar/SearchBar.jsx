import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { obtenerDogs } from '../../redux/actions/actions_dogs';
import './SearchBar.css'

/* const changeHandler = (event) => {
    const property = event.target.name
    let value = event.target.value
    setForm({
        ...form,
        [property]: value
    })
    handleSubmit(event);
} */


 



export function SearchBar() {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    
    function send(e){
    
        if (search.length === 0) return alert('Debe colocar un Dog');
        dispatch(obtenerDogs(search))  //le paso search que es el estado
        setSearch('') //despues que lo busca resetea la barra de busqueda
    }

    function handlerSearch(e){
      
      // console.log(e.target.value)
        setSearch(e.target.value)
   
    }

    return (<div className='formSearchBar '>
       
          <input  className='' type="text" placeholder='buscar Dog'  value={search}  onChange={(e)=>handlerSearch(e)}   />
           {/*  <input  className='inputButton' type="submit" value="Buscar" /> */}
            <button type='submit' onClick={(e)=>send(e)}>Buscar</button> 
       
         </div>
    )
}
