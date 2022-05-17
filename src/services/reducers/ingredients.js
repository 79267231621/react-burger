import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    groups: [
        { value: 'bun', name: 'Булки', items: []},
        { value: 'sauce', name: 'Соусы', items: []},
        { value: 'main', name: 'Начинки', items: []}
    ],
    current: {},
}

export const ingredients = (state = initialState, action) => {
    switch (action.type) {

        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredients: action.items,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
            }

        }
        case ADD_CURRENT_INGREDIENT: {
            return {
                ...state,
                current: action.item
            }
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                ...state,
                current: {}
            }
        }

        default: {
            return state;
        }
    }
}