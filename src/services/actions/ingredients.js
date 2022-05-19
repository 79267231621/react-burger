import { baseUrl, checkResponse } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";



export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        const patch = baseUrl + 'ingredients';
        const getIngredientsPost = async () => {
            fetch(patch).then(checkResponse)
                .then(data => {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: data.data
                    });
                })
                .catch(e => {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                    console.log(e);
                });
        }
        getIngredientsPost();
    };
}
