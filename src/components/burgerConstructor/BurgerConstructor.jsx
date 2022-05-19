import React from 'react';
import styles from './BurgerConstructor.module.css';
import IngredientConstructor from './IngredientConstructor/IngredientConstructor';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import Loader from "../loader/Loader";
import OrderDetails from "../orderDetails/OrderDetails";

import { addConstructorIngredient, CLEARE_CONSTRUCTOR_INGREDIENT} from "../../services/actions/cart";
import { useDispatch, useSelector } from 'react-redux';
import {DELETE_ORDER, getOrder} from "../../services/actions/order";

import { useDrop } from 'react-dnd';

export default function BurgerConstructor () {
    const [modal, setModal] = React.useState(false);
    const dispatch = useDispatch();
    const { ingredients, topBun, bottomBun, total } = useSelector(
        store => store.cart
    );

    const order = useSelector(
        store => store.order
    );

    const closePopup = () => {
        setModal(false);
        dispatch({type: DELETE_ORDER});
    }

    const checkout = () => {
        setModal(true);

        let orderList = {ingredients: []};
        ingredients.forEach((element) => {
            orderList.ingredients.push(element._id);
        })
        orderList.ingredients.push(topBun._id);
        orderList.ingredients.push(bottomBun._id);

        dispatch(getOrder(orderList))
        dispatch({type: CLEARE_CONSTRUCTOR_INGREDIENT});
    }

    const [, drop] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addConstructorIngredient(item));
        },
    });

    return (
        <section className="col col-50 mt-25 pl-4 pr-4"  ref={drop}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    { topBun.name &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={topBun.name + ' (верх)'}
                            price={topBun.price}
                            thumbnail={topBun.image}
                        />
                    }

                </div>

                <div className={[styles.ingrid, "scroll"].join(" ")} >
                    {ingredients.length > 0 ?
                            ingredients.map((element, index)=>
                                element.type !== 'bun' &&
                                element.name &&
                                <IngredientConstructor item={element} key={element.uuid}/>
                            )
                        :
                            <h2 className={[styles.drop__section, "p-5 text text_type_main-medium"].join(" ")}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</h2>
                    }


                </div>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    {bottomBun.name &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bottomBun.name + " (низ)"}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        />
                    }
                </div>

            </div>
            {ingredients.length > 0 &&
                <footer className={[styles.constructor__footer, "mt-10"].join(" ")}>
                    <div
                        className={[styles.constructor__footer__total, "text text_type_digits-medium mr-10"].join(" ")}>
                        {total}
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large" onClick={() => {
                        checkout()
                    }}>
                        Оформить заказ
                    </Button>

                </footer>
            }
            {modal &&
                <Modal closePopup={closePopup} >
                    {!order.orderRequest ?
                            <OrderDetails />
                        :
                            <Loader />
                    }
                </Modal>
            }
        </section>
    )
}
