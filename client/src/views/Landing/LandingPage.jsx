import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1 className = "titulo">
               BIENVENIDOS A LA API DE PERRITOS
            </h1>
            {/* <img className= "imagen_fondo" src="https://i.pinimg.com/236x/b2/c7/62/b2c762f6445c66c34babe6a3be04315a.jpg" alt= "Imagen de perrito"/> */}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <Link to="App.css" rel="stylesheet"></Link>
            <Link className= "linkDog" to="/home">INGRESAR</Link>
        </div>
    )
}