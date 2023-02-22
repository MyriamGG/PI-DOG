/* eslint-disable react/jsx-pascal-case */


    //===============================================================================

    
/*    

import Paginadonumerico from './Paginadonumerico';
const ITEMS_PER_PAGE = 8;
    const [currentPage, setcurrentPage] = useState(1);

    const indexOfLastCharacters = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstCharacters = indexOfLastCharacters - ITEMS_PER_PAGE;
    const currentCharacters = allDogs.slice(indexOfFirstCharacters, indexOfLastCharacters)

    const paginado = (numberPage) => {
        setcurrentPage(numberPage);
    }


      <Paginadonumerico
                 itemsPerPage={ITEMS_PER_PAGE}
                 allDogs={allDogs.length}
                 paginado={paginado}
                 nropage= {currentPage}
             />
 */

    //===============================================================



    
import React from 'react'
import Cards_dog from '../../components/Cards/Cards_dog'

function Home() {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
       
       <Cards_dog/>
    </div>
  )
}

export default Home
