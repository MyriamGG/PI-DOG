import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
//import thunk from 'redux-thunk' //middleware que nos permite realizar acciones asincrónicas
import rootReducer from "../reducer/reducer";
import thunkMiddleware from "redux-thunk";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer);
export default store;
