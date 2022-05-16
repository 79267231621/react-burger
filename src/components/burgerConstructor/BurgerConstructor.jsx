import React from 'react';
import styles from './BurgerConstructor.module.css';
import IngredientConstructor from './IngredientConstructor/IngredientConstructor';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

import {ADD_CONSTRUCTOR_INGREDIENT} from "../../services/actions/cart";
import { useDispatch, useSelector } from 'react-redux';
import {DELETE_ORDER, getOrder} from "../../services/actions/order";

import { useDrop } from 'react-dnd';


export default function BurgerConstructor () {
    const dispatch = useDispatch();
    const { ingredients, topBun, bottomBun, total } = useSelector(
        store => store.cart
    );

    const order = useSelector(
        store => store.order
    );

    const closePopup = () => {
        dispatch({type: DELETE_ORDER});
    }

    const checkout = () => {
        let orderList = {ingredients: []};
        ingredients.forEach((element) => {
            orderList.ingredients.push(element._id);
        })
        orderList.ingredients.push(topBun._id);
        orderList.ingredients.push(bottomBun._id);

        dispatch(getOrder(orderList))
    }

    const [, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({
                type: ADD_CONSTRUCTOR_INGREDIENT,
                item: item
            });

        },
    });

    return (
        <section className="col col-50 mt-25 pl-4 pr-4">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}  ref={drop}>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    { topBun.name &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={topBun.name}
                            price={topBun.price}
                            thumbnail={topBun.image}
                        />
                    }

                </div>

                <div className={[styles.ingrid, "scroll"].join(" ")}
                     //ref={dropCart}
                >
                    {ingredients.map((element, index)=>
                        element.type !== 'bun' &&
                        element.name &&
                            <IngredientConstructor item={element} key={index} index={index}/>

                    )}

                </div>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    {bottomBun.name &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bottomBun.name}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        />
                    }
                </div>
            </div>
            <footer className={[styles.constructor__footer, "mt-10"].join(" ")}>
                <div className={[styles.constructor__footer__total, "text text_type_digits-medium mr-10"].join(" ")}>
                    {total}
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={ () => { checkout() }}>
                    Оформить заказ
                </Button>

            </footer>
            {order.number &&
                <Modal closePopup={closePopup} >

                    <OrderDetails />

                </Modal>
            }
        </section>
    )
}
