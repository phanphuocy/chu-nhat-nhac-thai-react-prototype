import { combineReducers } from "redux";

// Import reducers
import dataReducer from "./dataReducers";
import playerReducer from "./playerReducers";
import interfaceReducer from "./interfaceReducers";

export default combineReducers({
  data: dataReducer,
  player: playerReducer,
  interface: interfaceReducer,
});
