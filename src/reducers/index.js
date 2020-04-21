import { combineReducers } from "redux";

// Import reducers
import dataReducer from "./dataReducers";
import playerReducer from "./playerReducers";

export default combineReducers({
  data: dataReducer,
  player: playerReducer,
});
