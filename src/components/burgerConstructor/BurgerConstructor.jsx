import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import ingredientsPropTypes from '../../utils/types'
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

export default function BurgerConstructor (props) {
    const [total, setTotal] = React.useState(610);
    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        const calculation = () => {
            let calculationTotal = null;
            for (let i = 0; i < props.ingredients.length; i++) {
                calculationTotal += props.ingredients[i].price;
            }
            setTotal(calculationTotal);
        }

        calculation();
    }, [props.ingredients]);

    const closePopup = () => {
        setModal(false);
    }


    return (
        <section className="col col-50 mt-25 pl-4 pr-4">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>

                <div className={[styles.ingrid, "scroll"].join(" ")}>
                        {props.ingredients.map((element, index)=>
                            element.type !== 'bun' &&
                                <div className={styles.ingrid__item} key={index}>
                                    <DragIcon type="primary"/>
                                    <ConstructorElement
                                        text={element.name}
                                        price={element.price}
                                        thumbnail={element.image}
                                    />
                                </div>
                        )}

                </div>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>

                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
            </div>
            <footer className={[styles.constructor__footer, "mt-10"].join(" ")}>
                <div className={[styles.constructor__footer__total, "text text_type_digits-medium mr-10"].join(" ")}>
                    {total}
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={ () => { setModal(true) }}>
                    Оформить заказ
                </Button>

            </footer>
            {modal &&
                <Modal closePopup={closePopup} >
                    <OrderDetails number='012363' />
                </Modal>
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    topBurger: PropTypes.arrayOf(ingredientsPropTypes),
    ingredients: PropTypes.arrayOf(ingredientsPropTypes),
    bottomBurger: PropTypes.arrayOf(ingredientsPropTypes)
};
