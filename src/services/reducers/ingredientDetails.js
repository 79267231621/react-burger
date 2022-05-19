import {
    ADD_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS
} from '../actions/ingredientDetails';

const initialState = {
    ingredient: {},
}

export const ingredientDetails = (state = initialState, action) => {
    switch (action.type) {

        case ADD_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: action.item,
            };
        }
        case DELETE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: {},
            };
        }
        default: {
            return state;
        }

    }
};