import { baseUrl, checkResponse } from '../../utils/api';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const DELETE_ORDER = "DELETE_ORDER";

export function getOrder( orderList ) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        const patch = baseUrl + 'orders';

        fetch(patch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(orderList)
        }).then(checkResponse)
            .then(data => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    items: data
                });
            })
            .catch(e => {
                dispatch({
                    type: GET_ORDER_FAILED
                });
                console.log(e);
            });

    };
}