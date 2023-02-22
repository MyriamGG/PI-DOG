import React from "react";

const Paginadonumerico = (props) => {

    let page = [];
    let simbolos = ["<<<...", "...>>>"]

    const cantPage = Math.ceil(props.allVideos/props.itemsPerPage);

    let endPage = cantPage;
    let inicio = 1;
    if (props.nropage + 5 < cantPage){
        endPage = props.nropage + 5;
        inicio = props.nropage;
    }
     else {
        if (cantPage - 5 > 0) {
            endPage = cantPage;
            inicio = cantPage - 5;
        }

     }

     for (let i = inicio; i <= endPage; i++){
        page.push(i);
    }

    const onClickBackHandler = (event) => {
        const valor = event.target.value - 1;
        props.paginado(valor);
    }

    const onClickGoHandler = (event) => {
        let valor = parseInt(event.target.value,10);
        valor = valor + 1;
        props.paginado(valor);
    }

    return(
        <>
            <div>
                <h1 className="titulo">Pagina: {props.nropage}</h1>
            </div>
            <nav>
                <ul className="ul2">
                    <button className="ul3" onClick={onClickBackHandler} value = {props.nropage} disabled= {props.nropage <= 1}>{simbolos[0]}</button>
                    <nav>
                        <ul className="ul">
                            {page && page.map(number =>  
                                <li className="number" key={number}>
                                    <a onClick={() => props.paginado(number)} className="btn_paginado">{number}</a>
                             </li>
                                )}
                        </ul>
                    </nav>
                    <button className="ul3" onClick={onClickGoHandler} value = {props.nropage} disabled={props.nropage >= cantPage}>{simbolos[1]}</button>
                </ul>
            </nav> 
       </>
    )
}

export default Paginadonumerico;