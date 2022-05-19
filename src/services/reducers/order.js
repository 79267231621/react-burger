import {
    GET_ORDER_SUCCESS,
    GET_ORDER_REQUEST,
    GET_ORDER_FAILED,
    DELETE_ORDER
} from '../actions/order';

const initialState = {
    number: null,
    order: {},
    orderRequest: false,
    orderFailed: false,
    total: 0,
}

export const order = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                order: action.items,
                number: action.items.order.number,
                orderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
            }
        }
        case DELETE_ORDER: {
            return {
                number: null,
                order: {},
                orderRequest: false,
                orderFailed: false,
                total: 0,
            }
        }
        default: {
            return state;
        }

    }
};