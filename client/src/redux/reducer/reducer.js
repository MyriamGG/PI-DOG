import {
  GET_DOG_DETAIL,
  DOGS,
  CREATE_RAZA,
  TEMPERAMENTO,
  FILTER_DOGS_BY_OPTIONS,
  FILTER_DOGS_BY_CREATION,
  ORDENAR,
  CLEAN_DETAIL,
  CLEAN_DOG,
  PUT_DOGS,
  DEL_DOG,
} from "../actions_types";

let initialState = {
  dogs: [],
  detail: [],
  mydog: [],
  temp: [],
  copiaDogs: [],
  segundacopiaDogs: [],
};

export default function rootReducer(state = initialState, action) {
  //action recibe type y payload de action.js
  switch (action.type) {
    case DOGS:
      return {
        ...state,
        dogs: action.payload,
        copiaDogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case CREATE_RAZA || PUT_DOGS || DEL_DOG:
      return {
        ...state,
      };

    case TEMPERAMENTO:
      return {
        ...state,
        temp: action.payload,
      };
    case FILTER_DOGS_BY_OPTIONS:
      let allDogs = [];

      if (state.segundacopiaDogs.length !== 0) allDogs = state.segundacopiaDogs;
      else allDogs = state.copiaDogs;   

      const optionfiltered = allDogs.filter((el) => {
        let tempArr = [];
        if (el.temperament !== undefined) tempArr = el.temperament.split(",");
        if (tempArr !== undefined)
          for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].trim() === action.payload) {
              return el;
            }
          }
          console.log(tempArr)
      });
      if (optionfiltered.length === 0 && action.payload !== "All")
        console.log(alert("no existe raza con ese filtro ❌"));
      const optionfiltered2 =
        action.payload === "All" ? allDogs : optionfiltered;
      console.log(optionfiltered2)
      return {
        ...state,
        dogs: optionfiltered2,
      };
    case FILTER_DOGS_BY_CREATION:
      const allDogsCreated = state.copiaDogs;
      const createdfiltered =
        action.payload === "created"
          ? allDogsCreated.filter((el) => typeof el.ID !== "number")
          : allDogsCreated.filter((el) => typeof el.ID === "number");
      if (createdfiltered.length === 0)
        console.log(alert("no existe perrito con ese filtro ❌"));
      const createdfiltered2 =
        action.payload === "All" ? state.copiaDogs : createdfiltered;

      return {
        ...state,
        dogs: createdfiltered2,
        segundacopiaDogs: createdfiltered2,
      };
    case ORDENAR:
      const orderDog =
        action.payload === "Alfa_asc"
          ? state.dogs.sort((a, b) =>
              a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            )
          : action.payload === "Alfa_desc"
          ? state.dogs.sort((a, b) =>
              a.name < b.name ? 1 : a.name > b.name ? -1 : 0
            )
          : action.payload === "Peso_asc"
          ? state.dogs.sort((a, b) =>
              a.min_weight > b.min_weight
                ? 1
                : a.min_weight < b.min_weight
                ? -1
                : 0
            )
          : state.dogs.sort((a, b) =>
              a.min_weight < b.min_weight
                ? 1
                : a.min_weight > b.min_weight
                ? -1
                : 0
            );

      return {
        ...state,
        dogs: orderDog,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case CLEAN_DOG:
      return {
        ...state,
        dogs: {},
      };
    default:
      return { ...state };
  }
}
