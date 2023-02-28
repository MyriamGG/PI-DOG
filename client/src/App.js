import "./App.css";
import LandingPage from "./views/Landing/LandingPage";
import Detail_dog from "./components/Detail/Detail_dog";
import ShowForm from "./views/ShowForm/ShowForm";
import Home from "./views/Home/Home";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  let ruta = useLocation();

  return (
    <>
      <div className="margenes">
        {ruta.pathname == "/home" && <NavBar />}
        <Route exact path="/" component={LandingPage} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/dogDetail/:id" component={Detail_dog} />

        <Route exact path="/dog" component={ShowForm} />
      </div>
    </>
  );
}

export default App;
