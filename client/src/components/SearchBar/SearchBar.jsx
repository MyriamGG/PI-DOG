import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { obtenerDogs } from '../../redux/actions/actions_dogs';
import './SearchBar.css'

export function SearchBar(props) {
    const [search, setSearch] = useState({name:" "})
    const dispatch = useDispatch()
    
    function handlerSearch(event){

         const property = event.target.name
        let value = event.target.value
        setSearch({
            ...search,
            [property]: value
        })
        dispatch(obtenerDogs(search.name))
    }

return(
    <>
        <form>
            <label className="navLink">Buscar Raza</label>
            <input  type={"text"} 
                    name = 'name' 
                    value ={search.name} 
                    placeholder= "name..."
                    onChange={handlerSearch}
                    />
        </form>
    </>
)
}