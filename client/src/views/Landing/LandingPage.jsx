import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1 className = "titulo">
               BIENVENIDOS A LA API DE PERRITOS
            </h1>
            {/* <img className= "imagen_fondo" src='/src/images/fondo.jpg' alt= "Imagen de perrito"/>  */}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <Link to="App.css" rel="stylesheet"></Link>
            <Link className= "linkDog" to="/home">INGRESAR</Link>
        </div>
    )
}