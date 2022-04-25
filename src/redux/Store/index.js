import { createStore } from "redux";
import { reducer } from "../Reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(reducer, composeWithDevTools());
