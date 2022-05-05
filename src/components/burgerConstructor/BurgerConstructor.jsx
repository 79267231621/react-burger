import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import ingredientsPropTypes from '../../utils/types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

import { ConstructorContext } from '../../services/appContext';

export default function BurgerConstructor () {
    const [modal, setModal] = React.useState(false);
    const [order, setOrder] = React.useState(null);
    const url = 'https://norma.nomoreparties.space/api/orders';
    const { constructor, constructorDispatcher } = React.useContext(ConstructorContext);

    const closePopup = () => {
        setModal(false);
    }

    const checkout = () => {
        let orderList = {ingredients: []};
        constructor.ingredients.forEach((element) => {
            orderList.ingredients.push(element._id);
        })
        orderList.ingredients.push(constructor.topBun._id);
        orderList.ingredients.push(constructor.bottomBun._id);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(orderList)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
            setOrder( data.order.number );
            setModal(true);
        })
        .catch(e => {
            console.log(e);
        });
    }
    return (
        <section className="col col-50 mt-25 pl-4 pr-4">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={constructor.topBun.name}
                        price={constructor.topBun.price}
                        thumbnail={constructor.topBun.image}
                    />
                </div>

                <div className={[styles.ingrid, "scroll"].join(" ")}>
                    {constructor.ingredients.map((element, index)=>
                        element.type !== 'bun' &&
                            <div className={styles.ingrid__item} key={index}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={element.name}
                                    price={element.price}
                                    thumbnail={element.image}
                                    handleClose={() => constructorDispatcher({type: 'remove', value: element})}
                                />
                            </div>
                    )}

                </div>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>

                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={constructor.bottomBun.name}
                        price={constructor.bottomBun.price}
                        thumbnail={constructor.bottomBun.image}
                    />
                </div>
            </div>
            <footer className={[styles.constructor__footer, "mt-10"].join(" ")}>
                <div className={[styles.constructor__footer__total, "text text_type_digits-medium mr-10"].join(" ")}>
                    {constructor.total}
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={ () => { checkout() }}>
                    Оформить заказ
                </Button>

            </footer>
            {modal &&
                <Modal closePopup={closePopup} >
                    <OrderDetails number={ order } />
                </Modal>
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes)
};
