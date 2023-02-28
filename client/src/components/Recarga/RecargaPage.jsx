import './Recarga.css';

const RecargaPagina = (event) => {

    const handleClick = (event) => {
        window.location.reload();
    }

    return(
        <button className = 'cajita' onClick={handleClick}>Recargar Pagina</button>   
    )
}

export default RecargaPagina;