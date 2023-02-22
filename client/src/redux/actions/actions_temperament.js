import { TEMPERAMENTO } from "../actions_types";
import axios from "axios";

export const temperaments = () => {
  try {
    return async (dispatch) => {
      let pedidoApi = await axios.get("http://localhost:3001/temperaments");
      dispatch({ type: TEMPERAMENTO, payload: pedidoApi.data }); //datos enviados al reducer.js
    };
  } catch (error) {
    console.log(error && alert("fallo al cargar los temperamentos ❌"));
  }
};
