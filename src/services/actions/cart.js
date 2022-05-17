import uuid from "react-uuid";

export const ADD_CONSTRUCTOR_INGREDIENT = "ADD_CONSTRUCTOR_INGREDIENT";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";
export const UPDATE_CONSTRUCTOR_INGREDIENT = "UPDATE_CONSTRUCTOR_INGREDIENT";

export const CLEARE_CONSTRUCTOR_INGREDIENT = "CLEARE_CONSTRUCTOR_INGREDIENT";

export function updateConstructorIngredient(item, updateItem) {
    return {
        type: UPDATE_CONSTRUCTOR_INGREDIENT,
        item: item,
        updateItem: updateItem
    }
}

export function deleteConstructorIngredient(item) {
    return {
        type: DELETE_CONSTRUCTOR_INGREDIENT,
        item: item
    }
}

export function addConstructorIngredient(item) {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        item: {...item, uuid:uuid()}
    }
}