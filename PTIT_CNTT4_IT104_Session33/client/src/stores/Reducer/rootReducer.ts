import { combineReducers } from "redux";
import { reducerCart } from "./reducerCart";

export const rootReducer = combineReducers({
    cart:reducerCart
})