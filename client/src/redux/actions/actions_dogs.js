import axios from "axios";

import {
  DOGS,
  GET_DOG_DETAIL,
  CLEAN_DETAIL,
  CLEAN_DOG,
  TEMPERAMENTO,
  FILTER_DOGS_BY_CREATION,
  FILTER_DOGS_BY_OPTIONS,
  ORDENAR,
} from "../actions_types";
//=====================================================================
export const obtenerDogs = (name) => {
  if (name === undefined) name = " ";

  return async (dispatch) => {
    let pedidoApi = await axios.get(
      `http://localhost:3001/dogs?name=${name.trim()}`
    );
    return dispatch({ type: DOGS, payload: pedidoApi.data }); //datos enviados al reducer.js
  };
};

export function getDogDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error && alert("falló al cargar perritos ❌"));
    }
  };
}

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const cleanDog = () => {
  return { type: CLEAN_DOG };
};

export const crearDogs = (dog) => {
  return async function () {
    try {
      let json = await axios.post("http://localhost:3001/dogs/create", dog);
      return json;
    } catch (error) {
      console.log(error && alert("fallo al crear la raza ❌"));
    }
  };
};

export const putDogs = (dog, ID) => {
  try {
    return async function () {
      let json = await axios.put(
        `http://localhost:3001/dogs/actuality/${ID}`,
        dog
      );
      return json;
    };
  } catch (error) {
    console.log(error && alert("fallo al actualizar datos de razas ❌"));
  }
};

export const delDog = (ID) => {
  try {
    return async function () {
      let json = await axios.delete(`http://localhost:3001/dogs/delete/${ID}`);
      return json;
    };
  } catch (error) {
    console.log(error && alert("fallo al eliminar la raza ❌"));
  }
};

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

export const filterDogsbyOptions = (payload) => {
  return {
    type: FILTER_DOGS_BY_OPTIONS,
    payload,
  };
};

export const filterDogsbyCreation = (payload) => {
  return {
    type: FILTER_DOGS_BY_CREATION,
    payload,
  };
};

export const order = (payload) => {
  return {
    type: ORDENAR,
    payload,
  };
};
