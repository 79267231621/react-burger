import {ADD_CONSTRUCTOR_INGREDIENT} from "./cart";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        const url = 'https://norma.nomoreparties.space/api/ingredients';
        const getIngredients = async () => {
            fetch(url).then(res => {
                if (res.ok) {
                    return res.json();
                }
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
                return Promise.reject(`Ошибка ${res.status}`);
            })
                .then(data => {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: data.data
                    });
                    let bun = data.data.find( (item) => item.type === 'bun' );
                    if(bun){
                        dispatch(
                            {
                                type: ADD_CONSTRUCTOR_INGREDIENT,
                                item: bun

                            });

                    }
                })
                .catch(e => {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                    console.log(e);
                });
        }
        getIngredients();
    };
}
