import {
    ADD_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENT,
    DELETE_CONSTRUCTOR_INGREDIENT
} from '../actions/cart';

const initialState = {
    ingredients: [],
    topBun: {
        name: '',
        price: null,
        image: ''
    },
    bottomBun: {
        name: '',
        price: null,
        image: ''
    },
    total: 0,
}

export const cart = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CONSTRUCTOR_INGREDIENT: {
            if( action.item.type === 'bun' ){
                let total = (state.topBun.price)? state.topBun.price : null;
                total += (state.bottomBun.price)? state.bottomBun.price : null ;
                return {
                    ...state,
                    ingredients: state.ingredients,
                    topBun: action.item,
                    bottomBun: action.item,
                    total: state.total + action.item.price + action.item.price - total
                };
            }

            return {
                ...state,
                ingredients: [...state.ingredients, action.item ],
                total: state.total + action.item.price
            };
            /*
            if( !state.ingredients.find(ingredient => ingredient._id === action.item._id) ) {
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.item ],
                    total: state.total + action.item.price
                };
            } else {
                return state;
            }
            */
        }
        case DELETE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                ingredients: [
                     ...state.ingredients.filter((item, index) => index !== action.index)
                ],
                total: state.total - action.item.price
            }
        }
        case UPDATE_CONSTRUCTOR_INGREDIENT: {
            let oldIndex = state.ingredients.indexOf(action.item);
            state.ingredients.splice(oldIndex, 1 );

            let index = state.ingredients.indexOf(action.updateItem);
            state.ingredients.splice(index, 0,action.item ); // так можно удалить элемент

            return {
                ...state,
                ingredients: [
                    ...state.ingredients
                ]
            }
        }
        default: {
            return state;
        }

    }
};