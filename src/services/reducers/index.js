import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { ingredientDetails } from "./ingredientDetails";
import { cart } from "./cart";
import { order } from "./order";

export const rootReducer = combineReducers({
    cart,
    ingredients,
    order,
    ingredientDetails
})